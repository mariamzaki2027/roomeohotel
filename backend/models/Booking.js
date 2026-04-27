const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
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

    checkin: {
      type: Date,
      required: true
    },

    checkout: {
      type: Date,
      required: true
    },

    guests: {
      type: Number,
      required: true,
      min: 1
    },

    rooms: {
      type: Number,
      required: true,
      min: 1
    },

    totalPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);