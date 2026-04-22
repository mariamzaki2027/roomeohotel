const express = require("express");
const router = express.Router();

const {
  addHotel,
  getHotels,
  getHotelById
} = require("../controllers/hotelController");

router.post("/hotels", addHotel);
router.get("/hotels", getHotels);
router.get("/hotels/:id", getHotelById);

module.exports = router;