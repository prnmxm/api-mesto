const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.user = {
    _id: '5ed280999242039d4e2b4664',
  };

  next();
});

app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.all('*', (req, res) => res.status(404).json({ message: 'Запрашиваемый ресурс не найден' }));
app.listen(PORT);
