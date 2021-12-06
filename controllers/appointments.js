var Appointment = require('../model/appointment');

//frontend calls this method through MQTT
function createAppointment(appointmentData){
    var appointment = new Appointment(JSON.parse(appointmentData))
    //send appointment to request validator for availability check
}
