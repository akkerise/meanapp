var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dateSchema = new Schema({
});

module.exports = mongoose.model('date', dateSchema);
