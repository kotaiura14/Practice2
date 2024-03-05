const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const monsterList = require('./list/monsterList');
const kanaMap = require('./list/kanaList')

// Expressアプリでviewsディレクトリを設定する
app.set('views', path.join(__dirname, 'text'));
app.set('view engine', 'ejs');

app.use(express.static('text'));

app.use(express.static(path.join(__dirname, 'text')));

// CSS ファイルの MIME タイプを設定
app.use('/style.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
});

// ミドルウェアの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 検索関数
function searchMonster(query) {
    // ひらがなやカタカナを含むクエリを変換する
    const normalizedQuery = normalizeQuery(query);
    // 検索クエリの最初の文字を取得
    const initial = normalizedQuery.charAt(0);
    // 最初の文字にマッチする正規表現を作成
    const regex = new RegExp(`^${initial}.*$`);
    // モンスター名もひらがなやカタカナを含む形式に変換してから比較
    const matches = monsterList.filter(monster => regex.test(normalizeQuery(monster)));
    return matches;
}

// クエリのひらがなやカタカナを変換する関数
function normalizeQuery(query) {

    // クエリを一文字ずつ処理してひらがなやカタカナを含む形式に変換する
    const normalizedQuery = query.split('').map(char => {
        // 変換マップに含まれる場合は変換を行う
        if (char in kanaMap) {
            return kanaMap[char];
        }
        // 含まれない場合はそのまま返す
        return char;
    }).join(''); // 文字列に戻す

    return normalizedQuery;
}


// ルートエンドポイント
app.get('/', (req, res) => {
    // 検索フォームのみを表示するためのレンダリング
    res.render('text1', { results: null, error: null });
});

// 検索エンドポイント
app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        const errorMessage = '何やってんだ小松！！'
        res.render('text1',{results:[], error: errorMessage});
    } else {
        const results = searchMonster(query);
        res.render('text1',{results, error: null});
    }
});


// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
