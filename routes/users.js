const routes = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

routes.get('/users', getUsers);
routes.get('/users/:id', getUser);
routes.post('/users', createUser);
module.exports = routes;
