require("./models/User");
require("./models/Hotel");
require("./models/Booking");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", bookingRoutes);
app.use("/api", hotelRoutes);
/* Test Route */
app.get("/", (req, res) => {
  res.send("ROOMEO Backend Running");
});

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Connection Failed ❌");
    console.log(err);
  });