var express = require('express');
var router = express.Router();

/* 註冊 */

router.get('/', function(req, res, next) {
    // 時間驗證, 非報名時間顯示 Not Now.
    res.render('team/register');
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