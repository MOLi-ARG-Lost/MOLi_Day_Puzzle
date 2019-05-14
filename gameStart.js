var admin = require('firebase-admin');
var nodemailer = require('nodemailer');
var serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var database = admin.firestore();

var smtpConfig = {
    host: 'smtp.ncnu.edu.tw',
    port: 25,
};

var transporter = nodemailer.createTransport(smtpConfig);

async function _mailSender(mailArray) {
  for(let i = 0; i < mailArray.length; i++) {
      let transporter = nodemailer.createTransport(smtpConfig);

      let mailOptions = {
          from: "Secret_OS@ncnu.edu.tw",
          to: mailArray[i],
          subject: "MOLi x MysC - LOST",
          text: `
          《本信件為系統自動發信，請勿回信》

          《楔子》

          在這個網路發達的時代，認識一個人最快的方法，是從各式各樣的社群媒體如 Facebook、Instagram 、Twitter、微博等，彼此也都是透過通訊軟體來互相聯絡。這些數位足跡，成了現代人曾經存在過的一種證明。

          假如有一天，你無法在網路上找到一個人的任何資訊，一丁點都沒有，對這個人的印象又若有似無，你能肯定這個人真的存在嗎？

          Next (https://暨大猴子.tw/WowYouMayFindIt) `,
          html: "《本信件為系統自動發信，請勿回信》<br/><br/>《楔子》<br/><br/>在這個網路發達的時代，認識一個人最快的方法，是從各式各樣的社群媒體如 Facebook、Instagram 、Twitter、微博等，彼此也都是透過通訊軟體來互相聯絡。這些數位足跡，成了現代人曾經存在過的一種證明。<br/><br/>假如有一天，你無法在網路上找到一個人的任何資訊，一丁點都沒有，對這個人的印象又若有似無，你能肯定這個人真的存在嗎？<br/><br/><img src='cid:00000001'/><br/><br/><a href='https://暨大猴子.tw/WowYouMayFindIt'>Next</a>",
          attachments: [{
            filename: 'MysteryWords.png',
            path: './public/images/MysteryWords.png',
            cid: '00000001'
        }]
      };

      await transporter.sendMail(mailOptions, function(error, response) {
          if(error) {
              console.log(error);
              return false;
          } else {
              console.log("Message sent to " + mailArray[i] + " success");
          }
      });
  }

  return true;
}

database.collection('teams').get()
.then(async (snapshot) => {
    for(let doc of snapshot.docs) {
        let teamRegObject = doc.data();
        // 當三個人都通過時寄信
        if(teamRegObject['主要聯絡人']['是否驗證'] === '是' && teamRegObject['夥伴一']['是否驗證'] === '是' && teamRegObject['夥伴二']['是否驗證'] === '是') {
            await _mailSender([teamRegObject['主要聯絡人']['信箱'], teamRegObject['夥伴一']['信箱'], teamRegObject['夥伴二']['信箱']])
        }
    }
})
.catch((err) => {
    console.log('Game start send mail error: ' + err);
});