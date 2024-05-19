
const express = require('express');
const router = express.Router();
const calculateScore = require('../controllers/quiz');

router.post('/', (req, res) => {

    // calculateScore関数を直接呼び出す
    calculateScore(req, res);
});

module.exports = router;
