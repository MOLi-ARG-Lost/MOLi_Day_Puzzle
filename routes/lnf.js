var express = require('express');
var router = express.Router();

var cardPool = ['42122', '46106', '94522', '56154', '31610', '89178', '45658', '02906', '25722', '75994', '34314', '65210', '66906', '36506', '10186', '50906', '49306', '51354', '21690', '64218'];

router.post('/record', function(req, res, next) {
    let postData =req.body;
    let database = req.database;

    if(postData.cardID && cardPool.indexOf(postData.cardID) !== -1) {
        database.collection('teams').get()
        .then(async (snapshot) => {
            for(let docIndex in snapshot.docs) {
                let teamRegObject = snapshot.docs[docIndex].data();
                if(postData.cardID === teamRegObject['teamCode']) {
                    res.status(200).send({'message': '本卡片已被登記為遺失, 拾獲者為: ' + snapshot.docs[docIndex].id});
                    return;
                }
            }
            res.status(200).send({'message': '本卡片已被登記為遺失, 尚未有拾獲者'});
        })
        .catch((err) => {
            console.log('Get record error. Error: ' + err);
            res.status(500).send({'error': '伺服器網路發生錯誤，請稍後再試'});
        })
    } else {
        res.status(403).send((cardPool.indexOf(postData.cardID) !== -1) ? {'error': '缺少欄位'} : {'error': '非有效學生證卡號'});
    }
});

router.post('/found', function(req, res, next) {
    let foundObject = req.body;
    let database = req.database;
    if(foundObject && foundObject.id && foundObject.code && cardPool.indexOf(foundObject.code) !== -1) {
        let currentTime = new Date();
        foundObject.time = currentTime.toISOString();
        database.collection('teams').doc(foundObject.id).get()
        .then(async (doc) => {
            if (!doc.exists) {
                // 回傳查無此隊伍
                res.status(404).send({'error': '拾獲人 ID 錯誤'});
            } else {
                let teamObject = doc.data();
                teamObject.teamCode = foundObject.code;
                teamObject.updateTime = foundObject.time;
                await database.collection('teams').doc(foundObject.id).set(teamObject);
                res.status(200).send({'message': '遺失卡片新增成功', 'storyCode': 'PTIKK42SQG'});
            }
        })
        .catch((err) => {
            console.log('Set found data error. Error: ' + err);
            res.status(500).send({'error': '伺服器網路發生錯誤，請稍後再試'});
        });
    } else {
        res.status(403).send((cardPool.indexOf(foundObject.cardID) !== -1) ? {'error': '缺少欄位'} : {'error': '非有效學生證卡號'});
    }
});

module.exports = router;