var Appointment = require('../model/appointment');

//frontend calls this method through MQTT
function createAppointment(appointmentData){
    return new Appointment(JSON.parse(appointmentData));
}

exports.createAppointment = createAppointment;