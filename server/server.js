var express = require('express');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
var port = process.env.PORT || 8000;
var app = express();

/*************************DATABASE***************************/

mongoose.connect('mongodb://localhost/baller');

var User = require('./models/userModel.js');
var findUser = Promise.promisify(User.findOne, User);
var createUser = Promise.promisify(User.create, User);
var findAllUsers = Promise.promisify(User.find, User);

var Game = require('./models/gameModel.js');
var games = require('./config/gameData.js');
var findGame = Promise.promisify(Game.findOne, Game);
var createGame = Promise.promisify(Game.create, Game);
var findAllGames = Promise.promisify(Game.find, Game);

var Court = require('./models/courtModel.js');
var courtData = require('./config/courtData.js');
var createCourt = Promise.promisify(Court.create, Court);
var removeCourts = Promise.promisify(Court.remove, Court);
var findAllCourts = Promise.promisify(Court.find, Court);

courtData.forEach(function(court) {
  createCourt(court)
  .then(function(court) {
  })
  .catch(function(e) {
    console.log('Court already exists');
  });
});

games.forEach(function(game) {
  createGame(game)
  .then(function(court) {
  })
  .catch(function(e) {
    console.log('Game already exists');
  });
});


/************************MIDDLEWARE**************************/


//logs requests to the server in the console
app.use(morgan('dev'));

//parses the body of all incoming requests 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// // override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));


/**************************API ROUTES****************************/

// handle user signin
app.post('/api/signin', function(req, res) {
  var user = req.body;

  findUser({ email: user.email })
  .then(function(currentUser) {
    if (!currentUser) { return res.status(404).send('User does not exist.'); }

    currentUser.comparePasswords(user.password)
    .then(function(matched) {
      if (matched) {
        res.status(200).send('Signin successful!');
      }
    });
  })
  .catch(function(e) {
    console.log('Error finding user', e);
    res.end();
  });
});

// handle user signup
app.post('/api/signup', function(req, res) {
  var user = req.body;
  user.location = null;

  findUser({ email: user.email })
  .then(function(currentUser) {
    if (currentUser) { return res.status(404).send('User already exists'); }
    createUser(user)
    .then(function(user) {
      if (!user) { return res.status(404).send('Invalid user creation'); } 

      res.status(200).send('Successfully created!');
    });
  });
});


// gets all users
app.get('/api/users', function(req, res) {
  findAllUsers({})
  .then(function(users) {
    res.status(200).send({users: users});
  });
});


// gets all games
app.get('/api/games', function(req, res) {
  findAllGames({})
  .then(function(games) {
    res.status(200).send({games: games});
  });
});

app.get('/api/courts', function(req, res) {
  findAllCourts({})
  .then(function(courts) {
    res.status(200).send({courts: courts});
  });
});

//post a game to the database
app.post('/api/games', function(req, res) {
  var game = req.body;
  console.log(req.body);

  createGame(game)
    .then(function(game) {
      if (!game) { return res.status(404).send('Invalid game creation'); } 

      res.status(200).send('Game successfully created!');
    });
});

app.get('/api/main', function(req, res) {
  findAllCourts({})
  .then(function(courts) {
    findAllGames({})
    .then(function(games) {
      var data = [];

      games.forEach(function(game) {
        var courtData = courts.filter(function(court) {
          return court.name === game.court;
        });

        var gameData = {
          id: game._id,
          type: game.type,
          time: game.time,
          playerIds: game.playerIds,
          court: courtData[0]
        };

        data.push(gameData);
      });

      res.send({ data: data });
    });
  });
});

/***********************SERVER START*************************/


app.listen(port);
console.log('Listening on port', port);