const Booking = require("../models/Booking");

/* ================= CREATE BOOKING ================= */
exports.createBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests, totalPrice } = req.body;

    // validation
    if (!hotelId || !checkIn || !checkOut || !guests || !totalPrice) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const booking = await Booking.create({
      userId: req.user.id, // comes from token
      hotelId,
      checkIn,
      checkOut,
      guests,
      totalPrice
    });

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


/* ================= GET ALL BOOKINGS ================= */
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("hotelId", "title location price");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


/* ================= GET MY BOOKINGS ================= */
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id
    }).populate("hotelId");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


/* ================= DELETE BOOKING ================= */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    // only owner can delete
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await booking.deleteOne();

    res.json({
      message: "Booking cancelled"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};