var Appointment = require('../model/appointment');

//backend calls this method through MQTT
function createAppointment(appointmentData){
    var appointment = new Appointment(JSON.parse(appointmentData))
    //send appointment to backend for persisting
}
