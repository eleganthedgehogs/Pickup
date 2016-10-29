var db = require('./db.js');

// checks if the user exists in the database, then checks their password
var postLogin = function(req, res) {
  var user = req.body;

  db.findUser({ email: user.email })
  .then(function(currentUser) {
    if (!currentUser) { return res.status(404).send('User does not exist.'); }

    currentUser.comparePasswords(user.password)
    .then(function(matched) {
      if (matched) {
        res.status(200).send('login successful!');
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

      res.status(200).send('Successfully created!');
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
  var game = req.body;
  console.log(req.body);

  db.createGame(game)
    .then(function(game) {
      if (!game) { return res.status(404).send('Invalid game creation'); } 

      res.status(200).send('Game successfully created!');
    });
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

module.exports = {
  postLogin: postLogin,
  postSignup: postSignup,
  getUsers: getUsers,
  getGames: getGames,
  getCourts: getCourts,
  postGame: postGame,
  getMain: getMain
};

