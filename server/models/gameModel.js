var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  location: { type: String, required: true},
  time: {type: String, required: true },
  players: Array
});

GameSchema.methods.addPlayer = function(player) {
  var players = this.players;
  players.push(player);
};

module.exports = mongoose.model('games', GameSchema);