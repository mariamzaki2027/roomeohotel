
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 5. Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Response
    res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    // 2. Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    // 4. Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Response
    res.json({
      message: "Login success",
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
