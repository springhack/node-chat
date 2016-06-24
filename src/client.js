import ReactDOM from 'react-dom';
import React from 'react';
import Tree from 'react-ui-tree';
import io from 'socket.io-client';
import App from './App.jsx';

var Session = {
	user : ''
};

var socket = window.socket = io.connect();//'ws://127.0.0.1:3000');
socket.on('rec', function (data) {
	console.log(data.from, data.content);
});
socket.on('log', function (data) {
	console.log('Login: ' + data.result);
});
socket.on('err', function (data) {
	console.log('Error: ' + data.error);
});

function SendMsg(msg)
{
	socket.emit('say', {from : Session.user, content : msg});
}

function UpdateHistory(data)
{
	console.log(data);
}

ReactDOM.render(<App />, document.getElementById('main'));


import './style.css';
import './react-ui-tree.less';
import './theme.less';
import './app.less';
