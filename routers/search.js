const express = require('express');
const router = express.Router();
const { searchMonster } = require('../controllers/searchController');

// エラーハンドリングのミドルウェア
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('内部サーバーエラー');
}


router.get('/', async (req, res, next) => {
    try {
        const query = req.query.q;

        if (!query) {
            const errorMessage = '何やってんだ小松！！';
            return res.render('text1', { results: [], error: errorMessage });
        }

        const monsterList = req.app.locals.monsterList; // モンスターリストを取得
        const results = await searchMonster(query, monsterList, tokenizer);

        if (results.length === 0) {
            const errorMessage = '見つからないぞ小松！！';
            return res.render('text1', { results: [], error: errorMessage });
        }

        res.sendFile(pass.join(__dirname, '..', 'views', 'index.html'), { results: monsterList, error: null });

    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
