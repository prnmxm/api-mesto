const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const headers = require('../headers/headers');
const LinkValidaton = require('../errors/LinkValidation');


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
    avatar: Joi.string().required().custom(LinkValidaton, 'link validation'),
  }),
}), createUser);

routes.get('/users', celebrate({ ...headers }), auth, getUsers);
routes.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
    ...headers,
  }),
}), auth, getUser);

module.exports = routes;
