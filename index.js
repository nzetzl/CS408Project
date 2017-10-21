var express = require('express');
var session = require('express-session')
var sqlite3 = require('sqlite3').verbose();
var app = express();
var http = require('http').createServer(app);
//var server = require('http').createServer(app); 
var mongoose = require('mongoose');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/BoilerChess'));
app.use(express.static(__dirname + '/node_modules/socket.io/lib'));
var port = process.env.PORT || 4000;
var loggedIn = 0; //using for testing, will implement a better check later;

app.use(session({
	secret: 's3cr3t k3y',
	resave: false,
	saveUninitialized: true
  }));


app.use(bodyParser.urlencoded({ extended: false }))
var db = new sqlite3.Database(__dirname + '/db/user.db');

io.on('connection', function(socket) {
    console.log('New connection');

    socket.on('message', function(msg) {
        console.log('Got message from client: ' + msg);
    })
});

app.get('/', function (req, res) {
	console.log('get');
	res.sendFile(__dirname + '/BoilerChess/login.html');
});

app.get('/userProfile.html', checkAuth, function (req, res) {
	res.sendFile(__dirname + '/BoilerChess/userProfile.html');
});

app.post('/', function (req, res) {
	console.log('post');
	let username = req.body.username;
	let password = req.body.password;

	let query = 'SELECT username, pass FROM USERS WHERE username = \'' + username + '\' and pass = \'' + password + '\'';
	console.log(query);
	db.all(query, (err, rows) => {
		var c = 0;
		if (err === null)
			console.log('err: ' + err);
		rows.forEach((row) => {
			console.log(row.pass);
			c = 1;
			console.log(c);
			req.session.user_id = username;
			res.redirect('/userProfile.html');
		});
		if(c == 0)
			res.send('Username or password invalid');
	});
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

function checkAuth(req, res, next) {
	if (!req.session.user_id) {
	  res.send('You are not authorized to view this page');
	} else {
	  next();
	}
  }

http.listen(port, function () {
	console.log("using port # " + port + " \n");
});