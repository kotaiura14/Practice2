const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// モンスターリストとレベルリストの読み込み
const monsterList = require('./list/monsterList');
const levelList = require('./list/levelList');

// ミドルウェア設定
app.use(express.static('text'));  // 'text'ディレクトリは存在するのでしょうか？pathの設定が必要か確認が必要です。
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJSビューエンジンの設定
app.set('view engine', 'ejs');

// ルーティングモジュール
app.use('/', require('./routers/homePage'));  // ホームページ
app.use('/search', require('./routers/search'));  // モンスター名検索
app.use('/search-lebel', require('./routers/searchLevel'));  // 捕獲レベル検索
app.use('/quiz', require('./routers/quizLink'));  // クイズページリンク
app.use('/quizPage', require('./routers/quizPage'));  // クイズページ
app.use('/scorePage', require('./routers/scorePage'));  // スコアページ

// アプリケーション全体で使うローカル変数の設定
app.locals.monsterList = monsterList;
app.locals.levelList = levelList;

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
