var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.send('hello world');
});

app.get('/login', function(req, res){
	//console.log(req);

	if(req.session.user == 'lku'){
		console.log(req.session.user);
		res.redirect('/sucess');
	}else{
		fs.readFile('login.html', function(err, data){
			res.send(data.toString());
		});
	}

});

app.post('/login', function(req, res){
	
	var login = req.body.login;
	var password = req.body.password;
	var sess = req.session;
	
	if(login == 'lku' && password == '1234'){
		
		sess.user = login;
		sess.password = password;
		res.redirect('/sucess');
		
	}
	else	
		console.log('fail');
	//console.log(sess);
});

app.get('/sucess', function(req, res){
	res.setHeader('Content-Type', 'text/html');
	res.write('login sucess!!!');
    res.write('<p>wlecome ' + req.session.user + '</p>');
    res.end();
	
});

app.use(function(req, res, next){
	ues.status(404);
	res.send('404 error');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.send('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate.');
});