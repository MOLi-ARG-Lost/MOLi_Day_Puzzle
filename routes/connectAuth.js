var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var salt = 'MOLiXMysC';
var cardPool = ['42122', '46106', '94522', '56154', '31610', '89178', '45658', '02906', '25722', '75994', '34314', '65210', '66906', '36506', '10186', '50906', '49306', '51354', '21690', '64218'];

router.get('/', function(req, res, next) {
    res.render('tunnelToAB/tunnel');
});

router.post('/', function(req, res, next) {
    let postData = req.body;

    if(!postData || !postData.cardCode || !postData.password) {
        return res.status(403).render('errorPage', {'error': '缺少資料欄位'});
    }

    if (cardPool.indexOf(postData.cardCode) !== -1) {
        let database = req.database;
        database.collection('teams').get()
        .then((snapshot) => {
            for(let docIndex in snapshot.docs) {
                let teamObject = snapshot.docs[docIndex].data();
                if(teamObject['teamCode'] === postData.cardCode && teamObject['團隊密碼'] === crypto.createHmac('sha512', salt).update(postData.password).digest().toString('hex')) {
                    return res.status(200).render('tunnelToAB/portal');
                } else if(teamObject['teamCode'] === postData.cardCode) {
                    return res.status(500).render('errorPage', {'error': '密碼錯誤'});
                }
            }
            return res.status(500).render('errorPage', {'error': '卡片尚未完成連結'});
        })
        .catch(async (err) => {
            console.log('Auth request error, Error: ' + err);
            return res.status(500).render('errorPage', {'error': '伺服器內部錯誤'});
        });
    } else {
        return res.status(500).render('errorPage', {'error': '無效卡號'});
    }
});

router.post('/Next', function(req, res, next) {
    let postData = req.body;

    if(!postData || !postData.secretCode) {
        return res.status(200).render('tunnelToAB/tunnel');
    }

    switch(postData.secretCode) {
        case 'SomeSecretDog':
            res.status(200).render('ab_puzzle/ab_chair');
            break;
        case 'SomeCutePangolin':
        res.status(200).render('ab_puzzle/ab_door');
            break;
        case 'SomeDeliciousTuna':
            res.status(200).render('ab_puzzle/ab_middle');
            break;
        case 'SomeAmazingWorld':
            res.status(200).render('ab_puzzle/ab_spring');
            break;
        default:
            res.status(200).render('tunnelToAB/tunnel');
            break;
    }

});

module.exports = router;