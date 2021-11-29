const mqtt = require("mqtt");
const topics = require("./topics");

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

client.on("connect", function() {

    const handlerTopic = topics.bookingHandlerTopic;

    function subscribe(topic) {
        client.subscribe(topic);
        console.log("Subscribed to: " + topic);
    }

    function publish(topic, message) {
        client.publish(topic, message, { qos: 1, retain:false });

    }

    subscribe(handlerTopic);
    
    publish(handlerTopic, 'Handle this: ...');
})

client.on('message', function(topic, message) {
    console.log(message.toString());
})
