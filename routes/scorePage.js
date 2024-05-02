const express = require('express');
const router = express.Router();
const calculateScore = require('./quizScore');

// POSTリクエストを処理するエンドポイント
router.post('/', calculateScore);

module.exports = router;
