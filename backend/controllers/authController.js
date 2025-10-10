const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const connectToDatabase = require('../utils/db');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    res.status(201).json({
      message: 'Berhasil menambahkan admin',
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      message: 'gagal menambahkan admin',
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    await connectToDatabase();
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        message: 'Pengguna tidak ditemukan',
        success: false,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: 'Password salah',
        success: false,
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login berhasil' });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal login',
      success: false,
      error: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.json({ message: 'Logout berhasil' });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal logout',
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  login,
  logout,
  register,
};
