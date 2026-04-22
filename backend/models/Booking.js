const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true
  },

  checkIn: {
    type: Date,
    required: true
  },

  checkOut: {
    type: Date,
    required: true
  },

  guests: {
    type: Number,
    required: true,
    min: 1
  },

  status: {
    type: String,
    default: "confirmed"
  },

  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);