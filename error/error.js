module.exports.errorHandler = (res, e) => {
  if (e.name === 'ValidationError') {
    return res.status(400).send({ message: e.message });
  }
  if (e.name === 'CastError') {
    return res.status(400).send({ message: e.message });
  }
  return res.status(500).send({ message: e.message });
};
