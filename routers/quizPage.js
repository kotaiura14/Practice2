const express = require('express');
const router = express.Router();
const generateQuiz = require('../controllers/generateQuiz');

// クイズページの表示
router.get('/', (req, res) => {
    const { difficulty, questionCount } = req.query;

    if (!difficulty || !questionCount) {
        return res.status(400).send('難易度と問題数を指定してください。');
    }

    const quizzes = generateQuiz(difficulty, questionCount);
    res.render('quizPage', { quizzes });
});

module.exports = router;