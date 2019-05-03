var admin = require('firebase-admin');
var nodemailer = require('nodemailer');

var serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var smtpConfig = {
    host: 'smtp.ncnu.edu.tw',
    port: 25,
};

var transporter = nodemailer.createTransport(smtpConfig);