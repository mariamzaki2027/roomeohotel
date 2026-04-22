const Hotel = require("../models/Hotel");

/* ADD HOTEL */
exports.addHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      message: "Hotel added successfully",
      hotel
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* GET ALL HOTELS */
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.json(hotels);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* GET ONE HOTEL */
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.json(hotel);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};