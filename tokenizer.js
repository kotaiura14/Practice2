const kuromoji = require('kuromoji');

// インスタンス化されたトークナイザーを格納するための変数
let tokenizer;

// Kuromojiの初期化
kuromoji.builder({ dicPath: 'C:\\Users\\kamel\\OneDrive\\デスクトップ\\program_ren\\Practice2\\text\\dict' }).build(function (err, _tokenizer) {
    if (err) throw err;
    // 初期化が完了したら、tokenizerに値を代入する
    tokenizer = _tokenizer;
});
// 初期化が完了するまで待機する必要はないので、tokenizerを即座にエクスポートする
module.exports = {
    // エクスポートするtokenizerは非同期で初期化されるため、undefinedの可能性があることに注意してください
    // 使用側で適切にハンドリングする必要があります
    tokenizer
};
