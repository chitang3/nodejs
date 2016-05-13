var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();

app.use(express.cookieParser());
app.use(express.limit('10mb'));
app.use(express.bodyParser({ uploadDir:__dirname + '/multipart'}));
app.use(app.router);

app.get('/', function(request, response)
{
	fs.readFile('upload_express.html', function(error, data)
	{
		response.send(data.toString());
	});
});


app.post('/', function(request, response)
{
	console.log(request.body);
	console.log(request.files);
	
	response.redirect('/');
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});