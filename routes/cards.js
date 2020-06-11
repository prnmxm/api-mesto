const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, delCard, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

routes.get('/cards', auth, getCards);
routes.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), auth, delCard);
routes.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(3).required(),
  }),
}), createCard);
module.exports = routes;
