var express = require('express');
var router = express.Router();

/* 註冊 */

router.get('/', function(req, res, next) {
    let currentTime = new Date();
    let startTime = new Date('2019-05-19T00:00:00.000Z');
    let endTime = new Date('2019-05-26T00:00:00.000Z')
    console.log('There is a person come in. Current time: ' + currentTime);
    console.log(currentTime >= startTime && currentTime < endTime && currentTime.getHours() == 0 && currentTime.getMinutes() <= 30);
    if(currentTime >= startTime && currentTime < endTime && currentTime.getHours() == 0 && currentTime.getMinutes() <= 30) {
        // 時間驗證, 非報名時間顯示 Not Now.
        res.render('team/register', {'status': true});
    } else {
        res.render('team/register', {'status': true});
    }
});

// [GET] 查詢組隊驗證狀況

router.get('/:teamKey', function(req, res, next) {
    let teamKey = req.params.teamKey;
    req.database.collection('teams').doc(teamKey).get()
    .then((doc) => {
        if (!doc.exists) {
            // 回傳查無此隊伍
            res.render('team/teamNotFound', { 'teamKey': teamKey});
        } else {
            // 送出資料
            res.render('team/teamData', { 'teamObject': doc.data() });
        }
    })
    .catch((error) => {
        console.log('Get team status error. Error: ' + error);
        res.render('teamNotFound', { 'error': '網路錯誤'});
    });
});

module.exports = router;