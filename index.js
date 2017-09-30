var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = 3000;

//app.get('/', function(req, res) {
//	app.use(express.static(path.join('BoilerChess/login.html', 'public')));

//});

http.listen(port, function () {
	console.log("using port # " + port);
});

