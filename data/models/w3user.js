var mongoose = require('mongoose');
var UserSchema = require('../schemas/w3user');


module.exports = mongoose.model('User', UserSchema);
