var fs = require('fs');
var http = require('http');
var express = require('express');
var session = require('express-session');
var app = express();

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.session(
{
	secret: 'secret key',
	key : 'login',
	cookie :
	{
		maxAge: 60 * 1000
	}
}));

app.get('/', function(request, response)
{
	if(request.cookies.auth)
		response.redirect('/a');
	else
		response.redirect('/login');
});

app.get('/a', function(request, response)
{
	fs.readFile('login_upgrade_express_a.html',function(error,data)
	{
		response.send(data.toString());
	});
});

app.get('/b', function(request, response)
{
	fs.readFile('login_upgrade_express_b.html',function(error,data)
	{
		response.send(data.toString());
	});
});

app.get('/login', function(request, response)
{
	fs.readFile('login.html', function(error, data)
	{
		response.send(data.toString());
	});
});

app.post('/login', function(request, response)
{
	var login = request.param('login');
	var password = request.param('password');

	console.log(login, password);
	console.log(request.body);

	if(login == 'park' && password == '1234')
	{

			request.session.user = 'park';
			response.cookie('auth', true);
			response.redirect('/');
	}
	else
		response.redirect('/login');
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});