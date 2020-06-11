const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(200).send({ data }))
    .catch(next);
};

module.exports.delCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new ErrorNotFound('Карточка не существует');
      }
      if (req.user._id !== data.owner.toString()) {
        throw new ErrorUnauthorized('Не твоя');
      }
      return data.remove().then(res.status(200).send({ data }));
    })
    .catch(next);
};
