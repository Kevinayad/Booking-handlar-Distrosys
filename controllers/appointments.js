const Appointment = require('../model/appointment');

//broker calls this method (triggered by MQTT request coming from Frontend)
function createAppointment(appointmentData){

    //Parse data to access specific attributes
    appointmentData = JSON.parse(appointmentData);
    //Use Math.random() to generate unique IDs
    var random = Math.round(Math.random() * 100)

    //ID = base number + random number
    var appointmentObj = new Object();
    appointmentObj.userid = 10000 + random,
    appointmentObj.requestid = 1000 + random,
    appointmentObj.dentistid = appointmentData.dentistid,
    appointmentObj.issuance = 1000000 + random,
    appointmentObj.date = appointmentData.date.date
    //console.log(appointmentObj.date);
    //This will check for empty values or type errors
    return new Appointment(appointmentObj);
}

exports.createAppointment = createAppointment;