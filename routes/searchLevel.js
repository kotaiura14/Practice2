const express = require('express');
const router = express.Router();
const { searchLevel } = require('../controllers/searchController');

router.get('/', (req, res) => {
    const query = req.query.q;
    if (!query) {
        const errorMessage = '何やってんだ小松！！';
        res.render('text1', { results: [], error: errorMessage });
    } else {
        const monsterList = req.app.locals.monsterList; // モンスターリストを取得
        const lebelList = req.app.locals.lebelList; // レベルリストを取得
        const results = searchLevel(query, monsterList, lebelList);
        if (results.error) {
            res.render('text1', { results: [], error: results.error });
        } else {
            res.render('text1', { results: results.results, error: null });
        }
    }
});

module.exports = router;