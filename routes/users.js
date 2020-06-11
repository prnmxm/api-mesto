const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({
      minDomainSegments: 2,
      tlds: true,
    }),
    password: Joi.string().min(6).required(),
  }),
}), login);
routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({
      minDomainSegments: 2,
      tlds: true,
    }),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required(),
  }),
}), createUser);

routes.get('/users', auth, getUsers);
routes.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), auth, getUser);

module.exports = routes;
