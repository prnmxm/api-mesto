const validator = require('validator');
const ErrorBadRequest = require('./ErrorBadRequest');

const LinkValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new ErrorBadRequest('url');
  }
  return value;
};
module.exports = LinkValidation;
