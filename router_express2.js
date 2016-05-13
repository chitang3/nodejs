var http = require('http');
var express = require('express');

var app = express();

app.use(express.logger());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/page/:id', function(request, response)
{
	var name = request.param('id');

	response.send('<h1>' + name + 'Page</h1>');
	response.send('<a href = "/b"> Go to B</a>');
});


http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});