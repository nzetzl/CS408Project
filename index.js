var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var app = express();
var bodyParser = require('body-parser')
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }))
var db = new sqlite3.Database('./users.db');
//db.
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/BoilerChess/login.html');
});

app.get('/createProfile.html', function (req, res) {
	res.sendFile(__dirname + '/BoilerChess/createProfile.html');

});

app.post('/createProfile.html', function (req, res) {
	db.all('insert into users (username, pass) values', (err, results) => {
		console.log(results);
		res.send(req.body);
	})
});
http.listen(port, function () {
	console.log("using port # " + port + " \n");
});