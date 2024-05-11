

const express = require('express');
const router = express.Router();
const { searchLevel } = require('../controllers/searchController');

const app = express();


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
            res.render('index', { level_results: [], error: errorMessage });
        } 
            const monsterDict_copy = req.app.locals.monsterDict_copy; // レベルリストを取得
            const level_results = await searchLevel(query, monsterDict_copy);
            const search_results = []
        
            if (level_results.length === 0) {
                const errorMessage = '見つからないぞ小松！！';
                return res.render('index', { level_results: [], error: errorMessage});
            }

        // res.render('levelindex', { level_results: level_results, error: null});
    } catch (error) {
        next(error);
    }
});
app.get('/search', (req, res) => {
    // 検索フォームのみを表示するためのレンダリング
    res.render('serchindex', { search_results: null, error: null, difficulty: '', questionCount: '' });
});



router.use(errorHandler);

module.exports = router;