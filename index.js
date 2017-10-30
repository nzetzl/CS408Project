var express = require('express');
var session = require('express-session')
var sqlite3 = require('sqlite3').verbose();
var app = express();
var http = require('http').createServer(app);
//var server = require('http').createServer(app); 
//var mongoose = require('mongoose');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var dir = __dirname;
app.use(express.static(__dirname + '/node_modules/socket.io/lib'));
app.use(express.static(__dirname + '/chessGame'));
var port = process.env.PORT || 4000;
var loggedIn = 0; //using for testing, will implement a better check later;

app.use(session({
	secret: 's3cr3t k3y',
	resave: false,
	saveUninitialized: true
}));


app.use(bodyParser.urlencoded({ extended: false }))
var db = new sqlite3.Database(__dirname + '/db/user.db');

io.on('connection', function (socket) {
	console.log('New connection');

	socket.on('message', function (msg) {
		console.log('Got message from client: ' + msg);
	});
	socket.on('move', function (msg) {
		console.log('emit broadcast');
		socket.broadcast.emit('move', msg);
	});
});

//TODO: add route to get user back to login after creating a user profile

app.get('/', function (req, res) {
	console.log('get');

	//res.sendFile(dir + "/chessGame/gamepage.html");
	res.sendFile(dir + '/BoilerChess/login.html');
});

app.get('/userProfile.html', checkAuth, function (req, res) {
	res.sendFile(dir + '/userProfile.html');
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
			res.send('Username or password invalid');
		});
		if (c == 0)
			res.send('Username or password invalid');
	});
});


app.post('/userProfile.html', checkAuth, function (req, res) {
	res.sendFile(dir + "/chessGame/gamepage.html");

});

app.post('/createProfile.html', function (req, res) {
	let newUser = req.body.username;
	let newPass = req.body.password;
	let sql = 'INSERT INTO USERS (username, pass) VALUES (\'' + newUser + '\', \'' + newPass + '\')';
	console.log(sql)
	db.run(sql, (err, results) => {
		console.log('err: ' + err)
		console.log(req.body.username);
	})
	res.redirect('/');
});

app.get('/play.html', function (req, res) {
	res.sendFile(dir + '/BoilerChess/play.html');
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
