
const express = require('express');
const router = express.Router();
const calculateScore = require('../controllers/quiz');

router.post('/', (req, res) => {
    // 受信したデータをログに出力（デバッグ用）
    const { answers, quizzes } = req.body;

    console.log('Received answers:', answers);
    console.log('Received quizzes:', quizzes);

    // calculateScore関数を直接呼び出す
    calculateScore(req, res);
});

module.exports = router;
