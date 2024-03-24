const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const kuromojiInitializer = require('./kuromojiInitializer');
const viewConfig = require('./viewConfig');
const staticFileMiddleware = require('./staticFileMiddleware');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Kuromojiの初期化
kuromojiInitializer.initKuromoji();

// Expressアプリの設定
viewConfig.setupViewEngine(app);
staticFileMiddleware.setupStaticFiles(app);
middleware.setupMiddleware(app);

// ルートエンドポイント
app.get('/', routes.root);

// モンスター名検索エンドポイント
app.get('/search', routes.searchMonster);

// 捕獲レベル検索エンドポイント
app.get('/search-lebel', routes.searchLebel);

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
