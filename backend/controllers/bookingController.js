const Booking = require("../models/Booking");

/* CREATE BOOKING */
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* GET ALL BOOKINGS */
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("hotelId");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* DELETE BOOKING */
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking cancelled"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};