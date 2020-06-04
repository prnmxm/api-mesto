const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

function errorHandler(res, e) {
  if (e.name === 'ValidationError') {
    return res.status(400).send({ message: e.message });
  }
  if (e.name === 'CastError') {
    return res.status(400).send({ message: e.message });
  }
  return res.status(500).send({ message: e.message });
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).send({ message: 'nobody here' });
      }
      return res.status(200).send({ data });
    })
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
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: NODE_ENV === 'production' ? hash : password,
    }))
    .then((data) => res.send({ data: data.omitPrivate() }))
    .catch((e) => {
      errorHandler(res, e);
    });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev';
      const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 10080,
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch((e) => {
      res.status(401).send({ message: e.message });
    });
};
