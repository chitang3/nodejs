var fs = require('fs');
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var app = express();

var connection = mysql.createConnection(
{
	host		: 'localhost',
	port		: 3306,
	user		: 'root', 
	password	: 'MYdb#549',
	database	: 'test'
});

    	
mongoose.connect('mongodb://localhost:27017/nodejs'); //mongodb connection
app.use(express.cookieParser());//cookie 이용하기 위해
app.use(bodyParser.urlencoded({extended: false}));//session 이용하기 위해
//app.use(app.router); 오류생김
app.use(express.json());

//추가된 부분
connection.connect(function(err)	//mysql 연동
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

app.use(session(		//session 설정과 mongodb 연동
{
	secret: "test node key",
	cookie :
	{
		maxAge: 60 * 1000
	},
	
	store : new MongoStore(
	{
		mongooseConnection: mongoose.connection
	})
}));

app.get('/', function(request, response)		//메인페이지
{
	if(request.session.logic == "true")
		response.redirect('/a');
	else
	{
		response.redirect('/login');
	}
});

app.get('/a', function(request, response)		//After Success login page
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

app.get('/b', function(request, response)		//After Success login page
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

app.post('/b', function(request, response)		//logout
{
	var logout = request.body.logout_button;

	request.session.destroy();
	console.log(request.session);
	response.redirect('/');
});

app.get('/login', function(request, response)	//login page
{
	fs.readFile('login.html', function(error, data)
	{
		response.send(data.toString());
	});


});

app.post('/login', function(request, response)		//process login
{
	var login = request.body.login;
	var password = request.body.password;

	console.log(login, password);
	console.log(request.body);

	var query = connection.query('select * from test_node where id = \'' + login +'\'', function(err, rows)
	{

		if(err)
		{
			console.log('err');
			console.log('err');
		} 
		else
		{
			console.log(rows);
			/*
			*	rows라는 json 인자는 배열 형태로 들어오기 때문에
			*	항상 rows[i] 형태로 사용해야한다.
			*/
			for(var i=0; i<rows.length;i++)
			{
				console.log(rows[i].id, rows[i].pass);

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
		}
		response.redirect('/');
		console.log(sess);
	});
});

http.createServer(app).listen(52273, function()
{
	console.log('Server running at http://127.0.0.1:52273');
});