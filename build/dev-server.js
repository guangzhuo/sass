
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var proxy = require('http-proxy-middleware');

var app = express();
var router = express.Router();
// router.get('/help-center', function (req, res, next) {
// 	// res.send('Hello World!');
//    res.redirect('/prerendered/help-center/index.html')
// });
// router.all('/', function(req, res, next) {
// 	res.sendfile("./dist/prerendered/index.html");
// });
router.all('/', function (req, res, next) {
	// res.send('Hello World!');
   res.sendfile("./dist/prerendered/index.html");
});
// all environments
app.set('port', 8081);

// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(app.router);
app.use('/user', proxy({target: 'https://dev.yunhetong.com', changeOrigin: true, secure: false,}))
app.use('/cas', proxy({target: 'https://dev.yunhetong.com', changeOrigin: true, secure: false,}))
app.use('/contract', proxy({target: 'https://dev.yunhetong.com', changeOrigin: true, secure: false,}))
// app.use(require('connect-history-api-fallback')())
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/', router);
// development only
if ('development' == app.get('env')) {
  // app.use(express.errorHandler());
}
// app.all('/', function (req, res, next) {
//   res.sendfile("../dist/prerendered/index.html");
//   next(); // pass control to the next handler
// });
app.get('/help-center', function (req, res) {
	 // res.send('Hello World!');
   res.sendfile("./dist/prerendered/help-center/index.html");
});
app.get('/introduction', function (req, res) {
	 // res.send('Hello World!');
   res.sendfile("./dist/prerendered/introduction/index.html");
});
app.get('/login', function (req, res) {
	 // res.send('Hello World!');
   res.sendfile("./dist/prerendered/login/index.html");
});
app.get('/news', function (req, res) {
	 // res.send('Hello World!');
   res.sendfile("./dist/prerendered/news/index.html");
});
app.get('/register', function (req, res) {
	 // res.send('Hello World!');
   res.sendfile("./dist/prerendered/register/index.html");
});
app.get('/solution', function (req, res) {
	 // res.send('Hello World!');
   res.sendfile("./dist/prerendered/solution/index.html");
});
// app.get('/help-center', function (req, res) {
// 	 // res.send('Hello World!');
//     res.redirect('/prerendered/help-center/index.html');
// });
// app.get('/', function(req, res){
// 	// response.write('a')
//   	// res.redirect('/prerendered/index.html');
//    res.send('USER');
// });
// app.get('/help-center', function(req, res){
//   // res.redirect('/prerendered/help-center/index.html');
//   // res.send('USER');
//   res.render('regular');
// });




http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
