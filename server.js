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

var names = [];

function guardarName(name) {
    console.log("Hola " + name);
    if (names.indexOf(name) === -1) {
        names.push(name);
        console.log("Un nuevo amigo!");
    } else {
        console.log("Un viejo conocido!");
    }
}
