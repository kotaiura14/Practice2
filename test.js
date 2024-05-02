const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const kuromoji = require('kuromoji');

const app = express();
const PORT = 3000;

// モンスターリストの読み込み
const monsterList = require('./list/monsterList');
const levelList = require('./list/levelList');

// body-parserミドルウェアの使用
app.use(bodyParser.urlencoded({ extended: true }));

// Kuromojiの初期化
kuromoji.builder({ dicPath: 'C:\\Users\\kamel\\OneDrive\\デスクトップ\\program_ren\\Practice2\\text\\dict' }).build(function (err, _tokenizer) {
    if (err) throw err;
    app.locals.tokenizer = _tokenizer; // Tokenizerをローカル変数として設定
});

// Expressアプリでviewsディレクトリを設定する
app.set('views', path.join(__dirname, 'text'));
app.set('view engine', 'ejs');

app.use(express.static('text'));
app.use(express.static(path.join(__dirname, 'text')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ルートエンドポイント
app.get('/', (req, res) => {
    // 検索フォームのみを表示するためのレンダリング
    res.render('text1', { results: null, error: null, difficulty: '', questionCount: '' });
});

// モンスター名検索エンドポイント
app.use('/search', require('./routes/search'));

// 捕獲レベル検索エンドポイント
app.use('/search-lebel', require('./routes/searchLevel'));

// クイズページへのリンクを追加
app.use('/quiz', require('./routes/quizLink'));
app.use('/quizPage', require('./routes/quizPage'));

// スコアページへのリンクを追加
app.use('/scorePage', require('./routes/scorePage'));

// モンスターリストとレベルリストをローカル変数として設定
app.locals.monsterList = monsterList;
app.locals.levelList = levelList;

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
