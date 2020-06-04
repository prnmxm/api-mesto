const routes = require('express').Router();
const {
  getUsers, getUser, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

routes.post('/login', login);
routes.post('/register', createUser);

routes.get('/users', auth, getUsers);
routes.get('/users/:id', auth, getUser);

module.exports = routes;
