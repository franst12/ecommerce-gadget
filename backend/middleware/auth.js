const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) return res.status(401).json({ message: 'Akses ditolak' });
  try {
    const isBlacklisted = Blacklist.findOne({ token: token });

    if (isBlacklisted) {
      return res.status(401).json({ message: 'Akses ditolak, token telah diblokir' });
    }

    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token tidak valid' });
  }
};

module.exports = verifyToken;
