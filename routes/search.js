const express = require('express');
const router = express.Router();
const morgan = require('morgan')
const { searchMonster } = require('../controllers/searchController');
const SearchResult = require('../model/user');
const { getHotWords } = require('../controllers/hotMongo');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// エラーハンドリングのミドルウェア
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('内部サーバーエラー');
}
//ログの出力するミドルウェアを設定
router.use(morgan('dev'));

let searchHistory = [];
let nextId = 1

router.post('/', (req, res, next) => {
    try {
        // リクエストボディからクエリを取得
        const search_history = req.body.q
        
        // クエリが存在しない場合はエラーを投げる
        if (!search_history) {
            const error = new Error('クエリが指定されていません');
            error.status = 400; // Bad Request
            throw error;
        }
        
        // ログを出力
        console.log('Received POST request with search_history:', search_history);
        
        // 履歴に追加
        searchHistory.push({ 
            id: nextId ++,
            search_history: search_history,
            timeStamp: new Date() 
        });
        // 成功レスポンスを返す
        console.log(searchHistory);
        res.render('serchindex', { search_results: null, error: null, searchHistory:searchHistory });
    } catch (error) {
        // エラーハンドリング
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        //query, tokenizerを変数として宣言
        const query = req.query.q; 
        //ログ
        console.log('Received GET request with query:', query);


        //indexにあるresuts, errorに結果を返す
        if (!query) {
            const errorMessage = '何やってんだ小松！！';
            console.error(errorMessage);
            return res.render('serchindex', { search_results: [], error: errorMessage, searchHistory:searchHistory });
        }
        //monster_dictを変数として宣言
        const monsterDict = req.app.locals.monsterDict; // モンスターリストを取得
        const search_results = await searchMonster(query, monsterDict);
        const level_results = []

        if (search_results.length === 0) {
            const errorMessage = '見つからないぞ小松！！';
            console.error(errorMessage);
            return res.render('searchindex', { search_results: [], error: errorMessage, searchHistory:searchHistory });
        }

        //データベースに保存
        for (const monster of search_results) {
            const newResult = new SearchResult({
                name: monster.name,
                level: monster.level.toString() // 数値を文字列に変換
            });
            await newResult.save();
            console.log('Saved new result to DB:', newResult);
        }

        res.render('serchindex', { search_results: search_results, error: null, searchHistory:searchHistory });
    } catch (error) {
        console.error('An error occurred:', error);
        next(error);
    }
});

router.put('/:id', (req, res, next) => {
        console.log(req.method); // 本来は 'POST' が表示されるが、ここで 'PUT' が表示されれば成功

    try {
        const itemId = parseInt(req.params.id);
        const newHistory = req.body.q;
        const historyIndex = searchHistory.findIndex(item => item.id === itemId);
        
        if (historyIndex === -1) {
            res.status(404).send('項目が見つかりません');
        } else {
            console.log(newHistory)
            searchHistory[historyIndex].search_history = newHistory;
            searchHistory[historyIndex].timeStamp = new Date(); // Update the timestamp
            console.log(searchHistory)
            res.redirect('/search')
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', (req, res, next) => {
        console.log(req.method);
    try {
        const itemId = parseInt(req.params.id);
        const initialLength = searchHistory.length;
        searchHistory = searchHistory.filter(item => item.id !== itemId);
        if (searchHistory.length === initialLength) {
            res.status(404).send('項目が見つかりません');
        } else {
            console.log('削除成功');
            res.redirect('/search')

        }
    } catch (error) {
        next(error);
    }
});

//ホットワード機能

router.get('/hotwords', async (req, res, next) => {
    try {
        const hotWords = await getHotWords();
        console.log('HotWords:', hotWords); // ログを追加してデバッグ
        res.json(hotWords);
    } catch (error) {
        console.error('Error fetching hot words:', error); // エラーをログに出力
        next(error);
    }
});

module.exports = router;
