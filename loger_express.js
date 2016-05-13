var http = require('http');
var express = require('express');

var app = express();

app.use(express.logger(':method + :date'));
app.use(function(request, response)
{
	response.send('<h1>express Basic</h1>');
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});