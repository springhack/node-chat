import ReactDOM from 'react-dom';
import React from 'react';
import Tree from 'react-ui-tree';
import io from 'socket.io-client';
import 'jquery';

import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('main'));


var socket = io.connect();//'ws://127.0.0.1:3000');

window.socket = socket;

console.log(socket.id);

socket.on('rec', function (data) {
	console.log(data.from, data.content);
});

socket.on('log', function (data) {
	console.log('Login: ' + data.result);
});

socket.on('err', function (data) {
	console.log('Error: ' + data.error);
});


import './style.css'
