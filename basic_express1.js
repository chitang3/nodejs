var http = require('http');
var express = require('express');

var app = express();

app.use(function(request, response)
{

	
	response.send(404, '<h1>ERROR</h1>');
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});