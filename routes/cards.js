const routes = require('express').Router();
const { getCards, delCard, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

routes.get('/cards', auth, getCards);
routes.delete('/cards/:id', auth, delCard);
routes.post('/cards', auth, createCard);
module.exports = routes;
