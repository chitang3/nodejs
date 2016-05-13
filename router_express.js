var http = require('http');
var express = require('express');

var app = express();

app.use(express.logger());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/a', function(request, response)
{
	response.send('<a href = "/b"> Go to B</a>');
});

app.get('/b', function(request, response)
{
	response.send('<a href = "/a"> Go to A</a>');
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});