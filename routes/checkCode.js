var express = require('express');
var router = express.Router();

/* 檢驗密碼的 API */

router.post('/OOXX', function(req, res, next) {
    let formData = req.body;
    if(formData['secretCode'] === "0000192940" || formData['secretCode'] === "0000192-940") {
        res.status(200).send({'message': 'Roger that, here is your "O"'});
    } else {
        res.status(403).send({'message': 'You got a wrong call.'});
    }
});

router.post('/getProgress', function(req, res, next) {

});

module.exports = router;