var express = require('express');
var router = express.Router();

router.get('/getStart', function(req, res, next) {
    res.render('403');
});

router.get('/lnf', function(req, res, next) {
    res.render('L1L2/lnf');
});

router.get('/cardRecord', function(req, res, next) {
    res.render('L1L2/cardRecode');
});

router.get('/OOXX', function(req, res, next) {
    res.render('L1L2/OOXX');
});

router.get('/untouchableWindows', function(req, res, next) {
    res.render('terminal');
});

router.get('/final', function(req, res, next) {
    res.render('final');
});

router.get('/freemasonry', function(req, res, next) {
    res.render('freemasonry');
});

router.get('/finAccount', function(req, res, next) {
    res.render('finAccount');
});

router.get('/Password', function(req, res, next) {
    res.render('pwdToFinAccount');
});

router.get('/computer', function(req, res, next) {
    res.render('computer');
});

router.get('/caesar_shift_5', function(req, res, next) {
    res.render('help');
});

module.exports = router;