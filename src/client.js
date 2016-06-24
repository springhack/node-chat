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

ReactDOM.render(<App socket={socket} />, document.getElementById('main'));


import './style.css';
import './react-ui-tree.less';
import './theme.less';
import './app.less';
