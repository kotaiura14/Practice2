

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
        //ログ
        console.log('Received GET request with query:', query);

        if (!query) {
            const errorMessage = '何やってんだ小松！！';
            console.error(errorMessage);
            res.render('levelindex', { level_results: [], error: errorMessage });
        } 
            const monsterDict = req.app.locals.monsterDict; // レベルリストを取得
            const level_results = await searchLevel(query, monsterDict);
            const search_results = []
        
            if (level_results.length === 0) {
                const errorMessage = '見つからないぞ小松！！';
                return res.render('levelindex', { level_results: [], error: errorMessage});
            }

        res.render('levelindex', { level_results: level_results, error: null});
    } catch (error) {
        console.error('An error occurred:', error);
        next(error);
    }
});
app.get('/search', (req, res) => {
    // 検索フォームのみを表示するためのレンダリング
    res.render('levelindex', { search_results: null, error: null, difficulty: '', questionCount: '' });
});



router.use(errorHandler);

module.exports = router;