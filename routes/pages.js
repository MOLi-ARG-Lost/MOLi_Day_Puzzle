var express = require('express');
var router = express.Router();

var storyArray = ['PTIKK42SQG', 'HS44APEBS8', 'APRVL69UB3', '7GF2M2XM2L', '36EF11SSOC', 'UC752H9W22', 'EM5NM91GA6'];

/* index */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* 學活403 */

router.get('/WowYouMayFindIt', function(req, res, next) {
    res.render('403');
});

/* 遺失物、卡片登記、OOXX */

router.get('/CanYouFindMe', function(req, res, next) {
    res.render('L1L2/lnf');
});

router.get('/IWantFindMyPath', function(req, res, next) {
    res.render('L1L2/cardRecode');
});

router.get('/WhatHappend', function(req, res, next) {
    res.render('L1L2/OOXX');
});

/* 終端機 */

router.get('/UntouchableWindows', function(req, res, next) {
    res.render('terminal');
});

/* 人文學院 */

router.get('/ItSoundsLikeYou', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('HS44APEBS8')) {
        res.render('humanities/hu');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

router.get('/HowToDescribeIt', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('HS44APEBS8')) {
        res.render('humanities/man');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

router.get('/IThinkItsHard', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('HS44APEBS8')) {
        res.render('humanities/it');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

router.get('/EveryoneBelongOneOfIt', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('HS44APEBS8')) {
        res.render('humanities/ies');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

/* 一線生機, 凱薩、帳表 */

router.get('/caesar_shift_5', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('APRVL69UB3')) {
        res.render('L4/help');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

router.get('/help', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('APRVL69UB3')) {
        res.render('L4/pwdToFinAccount');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

router.post('/help', function(req, res, next) {
    let postData = req.body;

    if(!postData || !postData.password) {
        return res.status(200).render('L4/pwdToFinAccount');
    }

    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('APRVL69UB3')) {
        if(postData.password === 'Y3.KIEP4.S' || postData.password === 'y3.kiep4.s') {
            return res.status(200).render('L4/finAccount');
        }
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }

    return res.status(200).render('L4/pwdToFinAccount');
});

/* 生之歷練 */

router.get('/final', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('APRVL69UB3')) {
        res.render('L4/final');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});



router.get('/freemasonry', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('7GF2M2XM2L')) {
        res.render('freemasonry');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

router.post('/freemasonry', function(req, res, next) {
    let postData = req.body;

    if(!postData || !postData.password) {
        return res.status(200).render('freemasonry');
    }

    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('7GF2M2XM2L')) {
        if(postData.password === 'library' || postData.password === 'LIBRARY') {
            return res.status(200).render('freemasonry_PWD');
        }
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }

    return res.status(200).render('freemasonry');
});

router.get('/ChangeTheWorld', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('UC752H9W22')) {
        res.render('computer');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

router.get('/are/you/telent/enough', function(req, res, next) {
    if(req.cookies['level'] && storyArray.indexOf(req.cookies['level']) >= storyArray.indexOf('UC752H9W22')) {
        res.render('final');
    } else {
        res.status(403).render('errorPage', {'error': '請先自 WorldSimulation 接收訊息代碼'});
    }
});

module.exports = router;