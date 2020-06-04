const routes = require('express').Router();
const {
  getUsers, getUser, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.get('/users', auth, getUsers);
routes.get('/users/:id', auth, getUser);

module.exports = routes;
