const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const kuromoji = require('kuromoji');

const app = express();
const PORT = 3000;

const monsterList = require('./list/monsterList');
const kanaMap = require('./list/kanaList')

// Kuromojiの初期化
kuromoji.builder({ dicPath: 'C:\\Users\\kamel\\OneDrive\\デスクトップ\\program_ren\\Practice2\\text\\dict' }).build(function (err, _tokenizer) {
    if (err) throw err;
    tokenizer = _tokenizer;
});

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

// Kuromojiを使用してクエリ文字列をひらがなに変換する関数
function convertToHiragana(query) {
    const tokens = tokenizer.tokenize(query);
    let hiragana = '';
    for (const token of tokens) {
        if (token.reading) {
            // 読みがある場合は読みを利用する
            hiragana += token.reading;
        } else {
            // 読みがない場合は表層形を利用する
            hiragana += token.surface_form;
        }
    }
    return hiragana;
}


// ミドルウェアの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 検索関数
function searchMonster(query) {
    // クエリをひらがなに変換
    const normalizedQuery = convertToHiragana(query);
    // 入力文字列がモンスター名に部分一致するかを検索
    const matches = monsterList.filter(monster => {
        const hiraganaMonster = convertToHiragana(monster);
        // モンスター名が入力文字列の頭文字で始まる場合のみマッチする
        return hiraganaMonster.startsWith(normalizedQuery);
    });
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
        const errorMessage = '何やってんだ小松！！';
        res.render('text1', { results: [], error: errorMessage });
    } else {
        const results = searchMonster(query);
        if (results.length === 0) {
            const errorMessage = '見つからないぞ小松！！';
            res.render('text1', { results: [], error: errorMessage });
        } else {
            res.render('text1', { results: results, error: null });
        }
    }
});


// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
