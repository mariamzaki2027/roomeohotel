const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
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
      required: true
    },

    image: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);