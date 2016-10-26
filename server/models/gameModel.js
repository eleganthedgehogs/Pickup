var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  location: { type: String, required: true},
  court: Number,
  time: {type: String, required: true },
  players: [{ type: String }]
});

GameSchema.methods.addPlayer = function(player) {
  var players = this.players;
  players.push(player);
};

module.exports = mongoose.model('games', GameSchema);