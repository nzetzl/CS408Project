var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var app = express();
var bodyParser = require('body-parser')
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }))
var db = new sqlite3.Database(__dirname + '/db/user.db');

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/BoilerChess/login.html');
});

app.post('/', function (req, res){ 
	console.log('post');
	let username = req.body.username;
	let password = req.body.password;
	//let query = 'SELECT COUNT(*) FROM (SELECT DISTINCT username, pass FROM USERS) WHERE username = \'' + username + '\' and pass = \'' + password + '\''; 
	//let query = 'SELECT (DISTINCT username, pass) FROM USERS WHERE username = \'' + username + '\' and pass = \'' + password + '\''; 
	let query = 'SELECT username FROM USERS WHERE EXISTS (SELECT DISTINCT username = \'' + username + '\' and pass = \'' + password + '\')'; 
	console.log(query);
	db.all(query, (err, results) => {
		if(err === null)
			console.log('err: ' + err);
			res.send(req.body);
	})
});

app.get('/createProfile.html', function (req, res) {
	res.sendFile(__dirname + '/BoilerChess/createProfile.html');

});

app.post('/createProfile.html', function (req, res) {
	let newUser = req.body.username;
	let newPass = req.body.password;
	let sql = 'INSERT INTO USERS (username, pass) VALUES (\'' + newUser + '\', \'' + newPass + '\')';
	console.log(sql)
	db.run(sql, (err, results) => {
		console.log('err: ' + err)
		console.log(req.body.username);
		res.send(req.body);
	})
});

app.get('/play.html', function (req, res) {
	res.sendFile(__dirname + '/BoilerChess/play.html');
});

http.listen(port, function () {
	console.log("using port # " + port + " \n");
});