const express = require('express');
const router = express.Router();
const calculateScore = require('./quizScore');

// POSTリクエストを処理するエンドポイント
router.post('/', async (req, res) => {
    try {
        // 受信したデータを取得
        const { answers, quizzes } = req.body;

        // 受信したデータをログに出力（デバッグ用）
        console.log('Received answers:', answers);
        console.log('Received quizzes:', quizzes);

        // calculateScore関数を呼び出してスコアを計算
        const score = await calculateScore(answers, quizzes);

        // スコアをクライアントに送信
        res.json({ score: score });
    } catch (error) {
        // エラーが発生した場合の処理
        console.error('Error calculating score:', error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
