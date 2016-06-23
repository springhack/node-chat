var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var path = require('path');
var fs = require('fs');

var conns = {};


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
			delete conns[cid];
	});

	socket.on('say', function (data) {
		if (!conns[cid]['user'])
		{
			socket.emit('err', {error : 'Must login'});
			return;
		}
		try {
			conns[data.to].sock.emit('rec', {from : cid, user : conns[cid].user, content : data.content});
		} catch (e) {
			socket.emit('err', {error : e.toString()});
		}
	});

	socket.on('log', function (data) {
		try {
			conns[cid].user = data.user
			socket.emit('msg', {type : 'log', id : cid});
		} catch (e) {
			socket.emit('err', {error : e.toString()});
		}
	});

});

server.listen(3000);
