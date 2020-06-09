const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errorHandler = require('../error/error');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send({ data }))
    .catch((e) => {
      errorHandler(res, e);
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'user not found' });
      }
      return res.status(200).send(data);
    })
    .catch((e) => {
      errorHandler(res, e);
    });
};
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  // if (!password || password.length < 6) {
  //   return res.status(200).send({ message: 'password' });
  // }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => res.send({ data: data.omitPrivate() }))
    .catch((e) => {
      if (e.code === 11000) {
        return res.status(409).send({ message: 'user already exists' });
      }
      return errorHandler(res, e);
    });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const secret = 'cf6c1b2ae5c40fda66aa47ca2c40bf443767d43fcab0e7c563215dacd67f2534';
      const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch((e) => {
      res.status(400).send({ message: e.message });
    });
};
