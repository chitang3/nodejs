var fs = require('fs');
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.use(express.cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
//app.use(app.router);
app.use(session(
{
	secret: 'keyboard cat',
	cookie :
	{
		maxAge: 60 * 1000
	}
}));


app.get('/', function(request, response)
{
	if(request.session.logic == "true")
		response.redirect('/a');
	else
	{
		response.redirect('/login');
	}
});

app.get('/a', function(request, response)
{
	if(request.session.logic == "true")
	{
		fs.readFile('login_upgrade_express_a.html',function(error,data)
		{
			response.send(data.toString());
		});
	}
	else
	{
		response.redirect('/');
	}
});

app.get('/b', function(request, response)
{
	if(request.session.logic == "true")
	{
		fs.readFile('login_upgrade_express_b.html',function(error,data)
		{
			response.send(data.toString());
		});
	}
	else
	{
		response.redirect('/');
	}
});

app.post('/b', function(request, response)
{
	var logout = request.body.logout_button;

	request.session.destroy();
	console.log(request.session);
	response.redirect('/');
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
	//var login = request.param('login');
	//var password = request.param('password');
	var login = request.body.login;
	var password = request.body.password;

	console.log(login, password);
	console.log(request.body);
	console.log(sess);

	if(login == 'park' && password == '1234')
	{
		var sess = request.session;
		sess.user = login;
		sess.password = password;
		sess.logic = "true";
		//response.cookie('auth', true);
		console.log(sess);
		response.redirect('/');
	}
	else
		response.redirect('/login');
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});