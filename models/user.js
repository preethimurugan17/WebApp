'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String
    },
    pwd: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    }
});

module.exports = mongoose.model('User', userSchema);