const express = require('express');
const router = express.Router();
const { searchMonster } = require('../controllers/searchController');

router.get('/', (req, res) => {
    const query = req.query.q;
    const tokenizer = req.app.locals.tokenizer; // Tokenizerを取得

    if (!query) {
        const errorMessage = '何やってんだ小松！！';
        res.render('text1', { results: [], error: errorMessage });
    } else {
        const monsterList = req.app.locals.monsterList; // モンスターリストを取得
        const results = searchMonster(query, monsterList, tokenizer);
        if (results.length === 0) {
            const errorMessage = '見つからないぞ小松！！';
            res.render('text1', { results: [], error: errorMessage });
        } else {
            res.render('text1', { results: results, error: null });
        }
    }
});

module.exports = router;