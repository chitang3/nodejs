var http = require('http');
var express = require('express');

var app = express();

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(function (request, response)
{
	response.writeHead(200, { 'Content-Type' : 'text/html' });
	response.end('<img src = "/Beach.jpg" width="100%" />' );
});
http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});