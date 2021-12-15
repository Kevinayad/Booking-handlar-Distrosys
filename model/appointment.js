var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    userid: {type: Number},
    requestid: {type: Number},
    dentistid: {type: Number},
    issuance: {type: Number},
    date: {type: Date}
});

module.exports = mongoose.model('appointments', appointmentSchema);
