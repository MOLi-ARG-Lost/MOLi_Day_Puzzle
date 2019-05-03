var express = require('express');
var router = express.Router();

router.get('/getStart', function(req, res, next) {
    res.render('403');
});

router.get('/lnf', function(req, res, next) {
    res.render('secretGroup/lnf');
});

router.get('/cardRecord', function(req, res, next) {
    res.render('secretGroup/cardRecode');
});

router.get('/OOXX', function(req, res, next) {
    res.render('secretGroup/OOXX');
});

router.get('/untouchableWindows', function(req, res, next) {
    res.render('terminal');
});

module.exports = router;