const mongoose = require('mongoose');
const validatorV = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return validatorV.isURL(v);
            },
            message: (props) => {
                return `${props.value} not link`
            }
        }
    }
});

module.exports = mongoose.model('user', userSchema)