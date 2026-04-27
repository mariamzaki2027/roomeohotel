const Room = require('../models/Room');

exports.getRooms = async (req, res) => {
  try {
    let query = {};
    const { search, filter, sort } = req.query;

    // 🔍 Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { desc: { $regex: search, $options: 'i' } }
      ];
    }

    // 💰 Filter
    if (filter === "low") query.price = { $lte: 100 };
    if (filter === "mid") query.price = { $gt: 100, $lte: 150 };
    if (filter === "high") query.price = { $gt: 150 };

    let rooms = Room.find(query);

    // 🔽 Sort
    if (sort === "low") rooms = rooms.sort({ price: 1 });
    if (sort === "high") rooms = rooms.sort({ price: -1 });

    const result = await rooms;
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};