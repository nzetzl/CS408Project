var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 4000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/BoilerChess/login.html');
});

app.get('/createProfile.html', function(req, res) {
	res.sendFile(__dirname + '/BoilerChess/createProfile.html');
	
});
/*
//sql setup
var sql = require('mssql');
var sqlConfig = {
	user: 'login',
	password: 'pass',
	server: 'localhost',
	database: 'TestDB'
}

app.get('/userProfile.html', function(req, res) {
	//TODO; implement authentication here
	console.log("username: " + req.query.username + " \n");
	console.log("pass: " + req.query.password + " \n");
	var pass = "";
	var sqlConnection = new sql.Connection(webconfig, function(err) {
		var request = new sql.Request(sqlConnection);
		pass = request.query('SELECT password FROM UsersTable WHERE username = username');
	});
	if (pass === req.password) {
		console.log("correct login credentials. User can proceed.\n");
		res.sendFile(__dirname + '/BoilerChess/');
	} else {
		console.log("incorrect password\n");
	}
	res.sendFile(__dirname + '/BoilerChess/userProfile.html');
});
*/

http.listen(port, function () {
	console.log("using port # " + port + " \n");
});

