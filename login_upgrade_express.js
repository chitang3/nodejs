var fs = require('fs');
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var app = express();
//추가된 부분
var connection = mysql.createConnection(
{
	host		: 'localhost',
	port		: 3306,
	user		: 'root', 
	password	: 'MYdb#549',
	database	: 'test'
});

app.use(express.cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
//app.use(app.router);
app.use(express.json());

//추가된 부분
connection.connect(function(err)
{
	if(err)
	{
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
	else
		console.log("connection success!");
});

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
	var login = request.body.login;
	var password = request.body.password;

	console.log(login, password);
	console.log(request.body);

	var query = connection.query('select * from test_node', function(err, rows)
	{

		if(err)
		{
			console.log('err');
			console.log('err');
		} 
		else
		{
			console.log(rows);


			for(var i = 0; i < rows.length; i++)
			{
				console.log(rows[i].id);
				console.log(rows[i].pass);

				if(login == rows[i].id && password == rows[i].pass)
				{
					console.log('DB인증 성공');

					var sess = request.session;
					sess.user = login;
					sess.password = password;
					sess.logic = "true";

					//response.cookie('auth', true);

					console.log(sess);
					break;
				}
				else
				{
					login_sucess = 0;
					console.log('DB인증 실패');
				}

			}
			response.redirect('/');
			console.log(sess);
		}
	});
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});