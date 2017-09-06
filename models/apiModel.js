var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var apiSchema = new Schema({
});

module.exports = mongoose.model('api', apiSchema);
