const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.status(200).send({ data }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new ErrorNotFound('Пользователь не найден');
      }
      return res.status(200).send(data);
    })
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => res.send({ data: data.omitPrivate() }))
    .catch((err) => {
      if (err.code === 11000) {
        const error = new ErrorConflict('Пользователь с такой почтой существует.');
        next(error);
      } else if (err.name === 'ValidationError') {
        const error = new ErrorBadRequest(err.message.replace(/card validation failed: /, ''));
        next(error);
      } else {
        next();
      }
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const secret = 'cf6c1b2ae5c40fda66aa47ca2c40bf443767d43fcab0e7c563215dacd67f2534';
      const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60 * 1000 * 7,
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch(next);
};
