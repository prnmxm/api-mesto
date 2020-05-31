const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).send({ message: 'nobody here' });
      }
      return res.status(200).send({ data });
    })
    .catch((e) => {
      if (e.name === e.ValidationError) {
        return res.status(400).send({ message: e.message });
      }
      if (e.name === e.CastError) {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'user not found' });
      }
      return res.status(200).send(data);
    })
    .catch((e) => {
      if (e.name === e.ValidationError) {
        return res.status(400).send({ message: e.message });
      }
      if (e.name === e.CastError) {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send({ data }))
    .catch((e) => {
      if (e.name === e.ValidationError) {
        return res.status(400).send({ message: e.message });
      }
      if (e.name === e.CastError) {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};
