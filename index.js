var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 4000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/BoilerChess/login.html');
});

http.listen(port, function () {
	console.log("using port # " + port);
});

