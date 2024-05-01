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
        const levelList = req.app.locals.levelList; // レベルリストを取得
        const searchResult = searchLevel(query, monsterList, levelList);
        if (searchResult.error) {
            res.render('text1', { results: [], error: searchResult.error });
        } else if (searchResult.results) {
            res.render('text1', { results: searchResult.results, error: null });
        } else if (searchResult.level) {
            res.render('text1', { results: [searchResult.level], error: null });
        }
    }
});

module.exports = router;