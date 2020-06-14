const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, delCard, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');
const headers = require('../headers/headers');
const LinkValidaton = require('../errors/LinkValidation');

routes.get('/cards', celebrate({ ...headers }), auth, getCards);
routes.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
  ...headers,
}), auth, delCard);
routes.post('/cards', celebrate({
  ...headers,
  body: Joi.object().keys({
    name: Joi.string().min(2).required(),
    link: Joi.string().required().custom(LinkValidaton, 'link validation'),
  }),
}), auth, createCard);
module.exports = routes;
