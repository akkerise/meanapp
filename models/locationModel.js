var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var locationSchema = new Schema({
});

module.exports = mongoose.model('location', locationSchema);
