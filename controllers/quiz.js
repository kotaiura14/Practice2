
function calculateScore(req, res) {
    console.log('Entering calculateScore function');

    try {
        // リクエストボディから回答とクイズデータを取得
        const { answers, quizzes } = req.body;
        console.log('Received answers:', answers);
        console.log('Received quizzes:', quizzes);

        // クイズデータが正しい形式であるかを確認
        if (!Array.isArray(quizzes)) {
            throw new Error('Invalid request: Quizzes must be an array');
        }

        // 正解数をカウントするための変数
        let correctCount = 0;

        // 回答が正解かどうかをチェック
        quizzes.forEach((quiz, index) => {
            if (quiz.correctLevel.toString() === answers[index]) {
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

module.exports = calculateScore;
