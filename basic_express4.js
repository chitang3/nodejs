var http = require('http');
var express = require('express');

var app = express();

app.use(function(request, response)
{
	var name =request.param('name');
	var region = request.param('region');

	response.send('<h1>' + name + '-' + region + '</h1>');
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});