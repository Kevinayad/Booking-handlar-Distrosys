var Appointment = require('../model/appointment');

//frontend calls this method through MQTT
export function createAppointment(appointmentData){
    return new Appointment(JSON.parse(appointmentData));
}
