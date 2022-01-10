const mqtt = require("mqtt");
const topics = require("./topics");
const handlerTopic = topics.bookingHandlerTopic;
const frontendTopic = topics.frontendTopic;
const appointments = require('../controllers/appointments.js');
const host = "ws://broker.emqx.io:8083/mqtt"

var clientId =
  "mqttjs_" +
  Math.random()
    .toString(16)
    .substr(3, 8);

const options = {
    keepalive: 60,
	protocolId: 'MQTT',
	protocolVersion: 4,
    clientId: clientId,
    username: 'test',
    password: '12',
	clean: true,
	reconnectPeriod: 1000,
	connectTimeout: 30 * 1000,
	will: {
		topic: 'WillMsg12',
		payload: 'booking-handler failure',
		qos: 1,
		retain: false
	},
}

const client = mqtt.connect(host, options);

function publish(topic, message) {
    //console.log(message);
    client.publish(topic, message, { qos: 1, retain:false });
}

client.on("connect", function() {

    console.log("Connecting mqtt client");
    function subscribe(topic) {
        client.subscribe(topic);
        console.log("Subscribed to: " + topic, { qos: 2 });

    }
    subscribe(frontendTopic);
})

client.on('message', function(topic, message) {
    if (topic == topics.frontendTopic){
        var appointment = appointments.createAppointment(message);
        //send appointment to request validator for availability check
        console.log(JSON.stringify(appointment));
        publish(handlerTopic, JSON.stringify(appointment));
        
    }
   // console.log(JSON.parse(message));
})
