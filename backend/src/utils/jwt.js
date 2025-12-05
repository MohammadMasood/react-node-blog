const jwt = require('jsonwebtoken');
const config = require('../config');

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

module.exports = { sign };
