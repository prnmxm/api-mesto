const { Joi } = require('celebrate');

const headers = {
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
};
module.exports = headers;
