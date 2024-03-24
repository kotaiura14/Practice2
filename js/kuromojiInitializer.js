const kuromoji = require('kuromoji');

function initKuromoji() {
    kuromoji.builder({ dicPath: 'C:\\Users\\kamel\\OneDrive\\デスクトップ\\program_ren\\Practice2\\text\\dict' }).build(function (err, _tokenizer) {
        if (err) throw err;
        tokenizer = _tokenizer;
    });
}

module.exports = {
    initKuromoji
};
