const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, delCard, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

routes.get('/cards', auth, getCards);
routes.delete('/cards/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), delCard);
routes.post('/cards', auth, createCard);
module.exports = routes;
