var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname));

app.listen(3000);
