var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var http = require('http');
var https = require('https');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
/* Use firebase firestore */
var admin = require('firebase-admin');

var serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/* For SSL

const privateKey = fs.readFileSync('/etc/letsencrypt/live/xn--pss23c41retm.tw/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/xn--pss23c41retm.tw/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/xn--pss23c41retm.tw/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
*/

var db = admin.firestore();

/* require route */
var pages = require('./routes/pages');
var register = require('./routes/register');
var registerPage = require('./routes/registerPage');
var check = require('./routes/checkCode');
var lnf = require('./routes/lnf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.database = db;
    next();
});

app.use('/', pages);
app.use('/register', registerPage);
app.use('/_api/register', register);
app.use('/_api/check', check);
app.use('/_api/lnf', lnf);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/* For SSL
var httpServer = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});

var httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
*/
module.exports = app;
