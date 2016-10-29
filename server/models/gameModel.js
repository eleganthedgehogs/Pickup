var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  type: String,
  court: { type: String, unique: true },
  time: { type: String, required: true },
  playerIds: [{ type: String }]
});

GameSchema.methods.addPlayer = function(player) {
  var players = this.playerIds;
  players.push(player);
};

module.exports = mongoose.model('games', GameSchema);