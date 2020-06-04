const Card = require('../models/card');

function errorHandler(res, e) {
  if (e.name === 'ValidationError') {
    return res.status(400).send({ message: e.message });
  }
  if (e.name === 'CastError') {
    return res.status(400).send({ message: e.message });
  }
  return res.status(500).send({ message: e.message });
}
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(200).send(data);
      }
      return res.send({ data });
    })
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
        return res.status(401).send({ message: 'not yours' });
      }
      data.remove();
      return res.status(200).send({ data });
    })
    .catch((e) => {
      errorHandler(res, e);
    });
};
