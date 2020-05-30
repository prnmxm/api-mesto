const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).send({ message: 'nobody here' });
      }
      return res.send({ data });
    })
    .catch((e) => res.status(500).send({ message: e.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(200).send({ data }))
    .catch((e) => res.status(500).send({ message: e.message }));
};

module.exports.delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'nobody here' });
      }
      return res.status(404).send({ data });
    })
    .catch((e) => res.status(500).send({ message: e.message }));
};
