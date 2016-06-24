var path = require('path');
var fs = require('fs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');
var config = require('./config');


var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var conns = {};
var index = {};
var db = mysql.createConnection({
	host : config.DB.HOST,
	user : config.DB.USER,
	port : config.DB.PORT,
	password : config.DB.PASS
});

db.connect(function (err) {
	if (err)
		throw err;
	console.log('Connected to db');
	db.query('use ' + config.DB.NAME);
});


app.use(express.static(path.join(__dirname, 'dist')));

io.on('connection', function (socket) {

	var cid = 'id_' + socket.id;

	console.log(cid);

	if (!conns.hasOwnProperty(cid))
	{
		conns[cid] = {
			user : false,
			msgs : [],
			sock : socket
		};
	}

	socket.on('disconnect', function () {
		if (conns[cid])
		{
			if (index[conns[cid].user])
				delete index[conns[cid].user];
			delete conns[cid];
		}
	});

	socket.on('say', function (data) {
		if (!conns[cid]['user'])
		{
			socket.emit('err', {error : 'Must login'});
			return;
		}
		try {
			if (index[data.to])
					index[data.to].sock.emit('rec', {from : conns[cid].user, content : data.content});
			else
					db.query("insert into MSG values(null,'" + conns[cid].user + "','" + data.to + "','" + data.content + "')");
		} catch (e) {
			socket.emit('err', {error : e.toString()});
		}
	});

	socket.on('log', function (data) {
		try {
			db.query("select * from USR where `user`='" + data.user + "' and `pass`='" + data.pass + "'", function (err, res, fld) {
				if (err)
				{
					socket.emit('log', {result : false});
					return;
				}
				if (res.length == 1)
				{
					conns[cid].user = data.user
					index[data.user] = conns[cid];
					socket.emit('log', {result : true});
				} else
					socket.emit('log', {result : false});
			});
		} catch (e) {
			socket.emit('err', {error : e.toString()});
		}
	});

});

server.listen(3000);
