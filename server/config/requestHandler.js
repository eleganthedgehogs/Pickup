var db = require('./db.js');
var _ = require('lodash');
var config = require('./secret.js');
var jwt = require('jsonwebtoken');

var createToken = function(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60 * 60 * 5 });
};

// checks if the user exists in the database, then checks their password
var postLogin = function(req, res) {
  var user = req.body;

  db.findUser({ email: user.email })
  .then(function(currentUser) {
    if (!currentUser) { return res.status(404).send('User does not exist.'); }

    currentUser.comparePasswords(user.password)
    .then(function(matched) {
      if (matched) {
        var profile = {
          username: currentUser.username,
          id: currentUser._id
        };

        var token = createToken(profile);

        res.status(201).send({
          id_token: token
        });
      }
    })
    .catch(function(error) {
      res.status(404).end();
    });
  })
  .catch(function(e) {
    console.log('Error finding user', e);
    res.status(404).end();
  });
};

// handle user signup and adds them to the database if they
//don't already exist
var postSignup = function(req, res) {
  var user = req.body;
  user.location = null;

  db.findUser({ email: user.email })
  .then(function(currentUser) {
    if (currentUser) { return res.status(404).send('User already exists'); }
    db.createUser(user)
    .then(function(user) {
      if (!user) { return res.status(404).send('Invalid user creation'); } 
      var profile = {
        username: user.username,
        id: user._id
      };

      var token = createToken(profile);
      console.log(token);
      var decoded = jwt.decode(token);
      console.log(decoded);
      res.status(201).send({
        id_token: token
      });
    });
  });
};

// gets all users from the database
var getUsers = function(req, res) {
  db.findAllUsers({})
  .then(function(users) {
    res.status(200).send({users: users});
  });
};

// gets all current games from the database
var getGames = function(req, res) {
  db.findAllGames({})
  .then(function(games) {
    res.status(200).send({games: games});
  });
};

//get all courts from the database
var getCourts = function(req, res) {
  db.findAllCourts({})
  .then(function(courts) {
    res.status(200).send({courts: courts});
  });
};

//post a new game to the database
var postGame = function(req, res) {
  var token = req.body.token;
  var game = req.body.game;
  if (token) {
    var userId = jwt.decode(token).id;

    db.createGame(game)
      .then(function(game) {
        if (!game) { return res.status(404).send('Invalid game creation');
         } 

         game.addPlayer(userId);

         game.save(function(err) {
          if (err) {
            console.log('error saving updates to game!');
          }

          console.log('Game time:', Number(new Date(game.time)), 'Current time (date.now):', Date.now(), 'Date.new:', Number(new Date()))
          setTimeout(() => db.deleteGame(game), Number(new Date(game.time)) - Number(Date.now()));
          res.status(200).send('Game successfully created!');  
        });
         
        // set Timeout to delete new game from database once it hits zero
        // res.status(200).send('Game successfully created!');
      });
  } else {
    res.status(401).end();
  }
};

//grabs all courts and games stored in the database
//then bundles them up before sending them to the client
var getMain = function(req, res) {
  db.findAllCourts({})
  .then(function(courts) {
    db.findAllGames({})
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

      res.send({ 
        games: data,
        courts: courts
      });
    });
  });
};

var joinGame = function(req, res) {
  console.log('attempting to joinGame');
  var game = req.body.game;
  var token = req.body.token;

  if (token) {
    var userId = jwt.decode(token).id;
    
    db.findGame({court: game.court.name})
    .then(function(game) {
      if (game.playerIds.indexOf(userId) === -1) {
        game.addPlayer(userId);

        game.save(function(err) {
          if (err) {
            console.log('error saving updates to game!');
          }
        });
        res.status(200).send('User added to game!');    
      } else {
        res.status(404).send('User is already in the game!');
      }
    })
    .catch(function(e) {
      console.log('Error finding game', e);
    });
  } else {
    console.log('No token sent');
    res.status(401).send('No token sent');
  }
};

var myGames = function(req, res) {
  var game = req.body.game;
  var token = req.body.token;

  console.log('token', token);

  if (token) {
    var userId = jwt.decode(token).id;
    db.findAllGames({})
    .then(function(games) {
      var userGames = games.filter(function(game) {
        return game.playerIds.indexOf(userId) !== -1;
      });
      console.log(userGames);
      res.send({ games: userGames });
    })
    .catch(function(e) {
      console.log('Error finding all games that user is a part of');
    });
  } else {
    res.status(401).send('No token sent');
  }
};

module.exports = {
  postLogin: postLogin,
  postSignup: postSignup,
  getUsers: getUsers,
  getGames: getGames,
  getCourts: getCourts,
  postGame: postGame,
  getMain: getMain,
  joinGame: joinGame,
  myGames: myGames
};

