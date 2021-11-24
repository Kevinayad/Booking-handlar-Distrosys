const mqtt = require("mqtt");
const topics = require("./topics");

const localHost = 'mqtt://127.0.0.1'; // Local host
const remoteHost = ''; // Remote host

// Change the value of host to the host in use.
const host = localHost;

const port = ':1883';

var client = mqtt.connect(host+port);

client.on("connect", function() {

    const handlerTopic = topics.bookingHandlerTopic;

    client.subscribe(handlerTopic);
    console.log("Subscribed to: " + handlerTopic);

    client.publish(handlerTopic, 'Handle this: ...');
})

client.on('message', function(topic, message) {
    console.log(message.toString());
})
