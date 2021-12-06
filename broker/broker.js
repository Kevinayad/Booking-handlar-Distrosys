const mqtt = require("mqtt");
const topics = require("./topics");
import { createAppointment } from './controllers/appointments.js';

const localHost = 'mqtt://127.0.0.1'; // Local host
const remoteHost = ''; // Remote host

// Change the value of host to the host in use.
const host = localHost;

const port = ':1883';

const options = {
    keepalive: 60,
	protocolId: 'MQTT',
	protocolVersion: 4,
	clean: true,
	reconnectPeriod: 1000,
	connectTimeout: 30 * 1000,
	will: {
		topic: 'WillMsg',
		payload: 'Connection Closed abnormally..!',
		qos: 1,
		retain: false
	},
    hostURL: (host+port)
}

const client = mqtt.connect(options.hostURL, options);

function publish(topic, message) {
    client.publish(topic, message, { qos: 1, retain:false });

}

client.on("connect", function() {

    const handlerTopic = topics.bookingHandlerTopic;
    const GUITopic = topics.frontendTopic;

    function subscribe(topic) {
        client.subscribe(topic);
        console.log("Subscribed to: " + topic);
    }

    subscribe(GUITopic);
    subscribe(handlerTopic);
    
    publish(handlerTopic, 'Handle this: ...');
})

client.on('message', function(topic, message) {
    if (topic == topics.frontendTopic){
        //TODO: test if method is called correctly
        var appointment = createAppointment(message);
        //send appointment to request validator for availability check
        publish(handlerTopic, appointment.toString);
    }
    console.log(message.toString());
})
