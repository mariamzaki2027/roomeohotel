const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  getMyBookings,
  deleteBooking
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

// ✅ CREATE booking (protected)
router.post("/bookings", authMiddleware, createBooking);

// ✅ GET all bookings
router.get("/bookings", getBookings);

// ✅ GET logged-in user's bookings (protected)
router.get("/bookings/my", authMiddleware, getMyBookings);

// ✅ DELETE booking (protected)
router.delete("/bookings/:id", authMiddleware, deleteBooking);

module.exports = router;