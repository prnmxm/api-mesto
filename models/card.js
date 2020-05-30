const mongoose = require('mongoose');
const validatorV = require('validator');

const userSchema = {
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validatorV.isURL(v),
      message: (props) => `${props.value} not link`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    types: [{ type: mongoose.Schema.Types.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('card', userSchema);
