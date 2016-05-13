var http = require('http');
var express = require('express');

var app = express();

app.use(function(request, response)
{
	var agent = request.header('User-Agent');

	if(agent.toLowerCase().match(/chrome/))
	{
		response.send('<h1>Hello Chrome~!</h1>');
	}
	else
	{
		response.send('<h1>Hello Express~!</h1>');
	}
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});