var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    userid: {type: Number},
    requestid: {type: Number},
    dentistid: {type: Number, required: 'Clinic is required'},
    issuance: {type: Number},
    date: {type: Date, required: 'Time is required'}
});

module.exports = mongoose.model('appointments', appointmentSchema);
