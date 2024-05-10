const express = require('express');
const router = express.Router();

function calculateScore(req, res) {
    console.log('Entering calculateScore function');

    try {
        // リクエストボディから回答とクイズデータを取得
        const { answer, quizzes } = req.body;
        console.log('Received answer:', answer);
        console.log('Received quizzes:', quizzes);

        // クイズデータが正しい形式であるかを確認
        if (!Array.isArray(quizzes)) {
            throw new Error('Invalid request: Quizzes must be an array');
        }

        // クイズデータからcorrectLevelの値だけを抽出した配列を作成
        const correctLevels = quizzes.map(quiz => quiz.correctLevel);

        // 正解数をカウントするための変数
        let correctCount = 0;

        // 回答が正解かどうかをチェック
        correctLevels.forEach((correctLevel) => {
            if (answer === correctLevel) {
                correctCount++;
            }
        });

        // 総質問数
        const totalQuestions = quizzes.length;

        // スコアオブジェクトを作成
        const score = {
            correctCount: correctCount,
            totalQuestions: totalQuestions
        };

        // スコアページをレンダリング
        res.render('scorePage', { score: score });
    } catch (error) {
        console.error('Error calculating score:', error.message);
        res.status(400).send('Error calculating score: ' + error.message);
    }
}

router.post('/', calculateScore);
module.exports = router;
