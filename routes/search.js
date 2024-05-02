const express = require('express');
const router = express.Router();
const { searchMonster } = require('../controllers/searchController');

// エラーハンドリングのミドルウェア
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('内部サーバーエラー');
}

// // ミドルウェア: Tokenizerをリクエストに追加
// router.use((req, res, next) => {
//     req.tokenizer = req.app.locals.tokenizer;
//     next();
// });

router.get('/', async (req, res, next) => {
    try {
        //query, tokenizerを変数として宣言
        const query = req.query.q; 

        //text1にあるresuts, errorに結果を返す
        if (!query) {
            const errorMessage = '何やってんだ小松！！';
            return res.render('text1', { results: [], error: errorMessage });
        }
        //monster_dictを変数として宣言
        const monsterDict = req.app.locals.monsterDict; // モンスターリストを取得
        const results = await searchMonster(query, monsterDict);

        if (results.length === 0) {
            const errorMessage = '見つからないぞ小松！！';
            return res.render('text1', { results: [], error: errorMessage });
        }

        res.render('text1', { results: results, error: null });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
