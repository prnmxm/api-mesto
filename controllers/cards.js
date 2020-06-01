const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(200).send(data);
      }
      return res.send({ data });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({ message: e.message });
      }
      if (e.name === 'CastError') {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(200).send({ data }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({ message: e.message });
      }
      if (e.name === 'CastError') {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};

module.exports.delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'nobody here' });
      }
      return res.status(200).send({ data });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({ message: e.message });
      }
      if (e.name === 'CastError') {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};
