const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return handleAuthError(res);
  }
  const secret = 'cf6c1b2ae5c40fda66aa47ca2c40bf443767d43fcab0e7c563215dacd67f2534';
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (e) {
    return handleAuthError(res);
  }
  req.user = payload;
  return next();
};
