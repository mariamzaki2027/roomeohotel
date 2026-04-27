const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  rating: Number,
  image: String,
  locationTag: String // Useful for filtering
});

module.exports = mongoose.model('Room', roomSchema);