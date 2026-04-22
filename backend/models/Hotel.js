const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  rating: {
    type: Number,
    default: 0
  },

  image: {
    type: String
  },

  description: {
    type: String
  },

  roomsAvailable: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model("Hotel", hotelSchema);