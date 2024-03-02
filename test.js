const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

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

// モンスターリスト
const monsterList = [
    "ポテネズミ", "アイスジャガー", "阿修羅タイガー", "ウォータイガー", "エンドマンモス", "オブサウルス", "ガウチ", "コンボイサウルス", "蠍魔牛", "サラマンダースフィンクス",
    "タクシープ", "トドバード", "ドム", "トロルコング", "バトルウルフ", "バブルナックル", "バロンタイガー", "般若パンダ", "フリーザバイソン", "ミルクジラ",
    "ユニコーンケルベロス", "桃ンガ", "リーガルマンモス", "リッパー・ザ・フォックス", "レオタイガー", "ゾンビタイパン", "エレファントサウルス", "ガララワニ", "シャークハコガメ",
    "デビル大蛇", "デビルクロコダイル", "沼蛇", "マザースネーク", "ストロヘビィー", "ウォールペンギン", "エンペラークロウ", "ニワトラ", "ルバンダ", "山喰いペリカン",
    "ビリオンバード", "白雪鮎", "サンサングラミー", "グランドシャーク", "ハムフィッシュ", "ストーンフィッシュ", "フライシャーク", "マダムフィッシュ", "アカミィ", "オウガイ",
    "フグ鯨", "カバザメ", "サーモンワイバーン", "ツチノコエビ", "ヤシもどき", "ルビークラブ", "ロックドラム", "要犀", "棺桶ガニ", "クスリバチ", "アーマーホイホイ", "おしり虫",
    "グラースビー", "ゲロゾウムシ", "ジャムグラスホッパー", "醤油バッタ", "バタフライワーム", "ハニードラゴン", "ヘラクレスドラゴン", "ロックビー", "スウィーツサンゴ", "メガオクトパス",
    "オクパルド", "オクトパスイカ", "ヒルヒール", "シャクレノドン", "ツンドラドラゴン", "七色ネッシー", "ブラガドラゴン", "レオドラゴン", "ゴロン獣", "ダルマホース", "ジャニスユニコーン",
    "豆乳道", "透影", "ヘラク", "パラサイトエンペラー", "スペースタイパン", "枝魔目", "ゴブリンプラント", "サンドリコ", "モンスタープラント（通称モンプラン）", "オゾン草",
    "ポイズンポテト", "マシュマロカボチャ", "BBコーン", "メテオガーリック", "キノコプリン", "イチゴ飯", "エレキバナナ", "ギャンブルベリー", "キューティクルベリー", "しびレモン",
    "チェリンゴ", "ドドリアンボム", "虹の実", "ビックリアップル", "ホワイトアップル", "ニトロ"
];

// 検索関数
function searchMonster(query) {
    const initial = query.charAt(0); // 検索クエリの最初の文字を取得
    const regex = new RegExp(`^${initial}.*$`); // 最初の文字にマッチする正規表現を作成
    const matches = monsterList.filter(monster => regex.test(monster));
    return matches;
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
