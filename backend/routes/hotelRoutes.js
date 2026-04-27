const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

router.get("/", async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;