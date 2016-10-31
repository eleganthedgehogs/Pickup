var Promise = require('bluebird');

/*****************DATABASE ACCESS FUNCTIONS*******************/

var User = require('../models/userModel.js');
var findUser = Promise.promisify(User.findOne, User);
var createUser = Promise.promisify(User.create, User);
var removeUser = Promise.promisify(User.remove, User);
var findAllUsers = Promise.promisify(User.find, User);

var Game = require('../models/gameModel.js');
var findGame = Promise.promisify(Game.findOne, Game);
var createGame = Promise.promisify(Game.create, Game);
var deleteGame = Promise.promisify(Game.remove, Game);
var findAllGames = Promise.promisify(Game.find, Game);

var Court = require('../models/courtModel.js');
var createCourt = Promise.promisify(Court.create, Court);
var removeCourts = Promise.promisify(Court.remove, Court);
var findAllCourts = Promise.promisify(Court.find, Court);


/**********************INITIAL DATA**************************/

var gameData = require('./data/gameData.js');
var courtData = require('./data/courtData.js');

//saves initial court data into the database
courtData.forEach(function(court) {
  createCourt(court)
  .then(function(court) {
  })
  .catch(function(e) {
    console.log('Court already exists');
  });
});

// saves initial game data into the database
// gameData.forEach(function(game) {
//   createGame(game)
//   .then(function(court) {
//   })
//   .catch(function(e) {
//     console.log('Game already exists');
//   });
// });

//saves initial user data into the database
// createUser({ email: 'eleganthedgehogs@hr.com', password: 'poop' })
// .then(function(user) {
//   console.log(user);
// })
// .catch(function(e) {
//   console.log('User already exists');
// });

/************************************************************/

module.exports = {
  findUser: findUser,
  createUser: createUser,
  removeUser: removeUser,
  findAllUsers: findAllUsers,
  findGame: findGame,
  createGame: createGame,
  findAllGames: findAllGames,
  createCourt: createCourt,
  removeCourts: removeCourts,
  findAllCourts: findAllCourts,
  deleteGame: deleteGame
};