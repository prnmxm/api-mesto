const routes = require('express').Router();
const { getCards, delCard, createCard } = require('../controllers/cards');

routes.get('/cards', getCards);
routes.delete('/cards/:id', delCard);
routes.post('/cards', createCard);
module.exports = routes;
