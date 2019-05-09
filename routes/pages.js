var express = require('express');
var router = express.Router();

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
    res.render('humanities/hu');
});

router.get('/HowToDescribeIt', function(req, res, next) {
    res.render('humanities/man');
});

router.get('/IThinkItsHard', function(req, res, next) {
    res.render('humanities/it');
});

router.get('/EveryoneBelongOneOfIt', function(req, res, next) {
    res.render('humanities/ies');
});

/* 一線生機, 凱薩、帳表 */

router.get('/caesar_shift_5', function(req, res, next) {
    res.render('L4/help');
});

router.get('/help', function(req, res, next) {
    res.render('L4/pwdToFinAccount');
});

router.post('/help', function(req, res, next) {
    let postData = req.body;

    if(!postData || !postData.password) {
        return res.status(200).render('L4/pwdToFinAccount');
    }

    if(postData.password === 'Y3.KIEP4.S' || postData.password === 'y3.kiep4.s') {
        return res.status(200).render('L4/finAccount');
    }

    return res.status(200).render('L4/pwdToFinAccount');
});

/* 生之歷練 */

router.get('/final', function(req, res, next) {
    res.render('L4/final');
});



router.get('/freemasonry', function(req, res, next) {
    res.render('freemasonry');
});

router.post('/freemasonry', function(req, res, next) {
    let postData = req.body;

    if(!postData || !postData.password) {
        return res.status(200).render('freemasonry');
    }

    if(postData.password === 'library' || postData.password === 'LIBRARY') {
        return res.status(200).render('freemasonry_PWD');
    }

    return res.status(200).render('freemasonry');
});

router.get('/ChangeTheWorld', function(req, res, next) {
    res.render('computer');
});

router.get('/are/you/telent/enough', function(req, res, next) {
    res.render('final');
});

module.exports = router;