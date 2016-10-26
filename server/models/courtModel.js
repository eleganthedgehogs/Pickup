var mongoose = require('mongoose');

var CourtSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  latitude: Number,
  longitude: Number,
  imageUrl: String
});


module.exports = mongoose.model('courts', CourtSchema);