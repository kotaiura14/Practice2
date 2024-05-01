const express = require('express');
const router = express.Router();

// クイズページへのリンクを表示
router.get('/', (req, res) => {
    res.render('quizLink'); // quizLink.ejsを表示
});

module.exports = router;
