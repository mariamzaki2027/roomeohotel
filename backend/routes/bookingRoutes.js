const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  deleteBooking
} = require("../controllers/bookingController");

router.post("/bookings", createBooking);
router.get("/bookings", getBookings);
router.delete("/bookings/:id", deleteBooking);

module.exports = router;