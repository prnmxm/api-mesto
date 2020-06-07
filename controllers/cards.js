const Card = require('../models/card');
const errorHandler = require('../error/error');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch((e) => {
      errorHandler(res, e);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(200).send({ data }))
    .catch((e) => {
      errorHandler(res, e);
    });
};

module.exports.delCard = (req, res) => {
  Card.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'nobody here' });
      }
      if (req.user._id !== data.owner.toString()) {
        return res.status(403).send({ message: 'not yours' });
      }
      return data.remove().then(res.status(200).send({ data }));
    })
    .catch((e) => {
      errorHandler(res, e);
    });
};
