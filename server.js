var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get("/sayHello", function (request, response) {
  var user_name = request.query.user_name;
  guardarName(user_name);
  response.end("Hello " + user_name + "!");
});

app.listen(port);

var EventHubClient = require('azure-event-hubs').Client;
 
var client = EventHubClient.fromConnectionString('Endpoint=sb://gestionespacios-eventhubs.servicebus.windows.net/;SharedAccessKeyName=fullaccess;SharedAccessKey=kEs9oEJ/YIU/0vOBUknAdDHcWlFufbY2P8U4FFHg1cA=;EntityPath=gestionespacios-hub', 'gestionespacios-hub')
client.open()
    .then(function() {
        return client.createReceiver('$Default', '10', { startAfterTime: Date.now() })
    })
    .then(function (rx) {
        rx.on('errorReceived', function (err) { console.log(err); }); 
        rx.on('message', function (message) {
            var body = message.body;
            // See http://azure.github.io/amqpnetlite/articles/azure_sb_eventhubs.html for details on message annotation properties from EH. 
            var enqueuedTime = Date.parse(message.systemProperties['x-opt-enqueued-time']);
            console.log(body);
        });
    });
