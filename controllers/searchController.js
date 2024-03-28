// Kuromojiを使用してクエリ文字列をひらがなに変換する関数
function convertToHiragana(query, tokenizer) {
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

// 検索関数
function searchMonster(query, monsterList, tokenizer) {
    // クエリをひらがなに変換
    const normalizedQuery = convertToHiragana(query, tokenizer);
    // 入力文字列がモンスター名に部分一致するかを検索
    const matches = monsterList.filter(monster => {
        const hiraganaMonster = convertToHiragana(monster, tokenizer);
        // モンスター名が入力文字列の頭文字で始まる場合のみマッチする
        return hiraganaMonster.startsWith(normalizedQuery);
    });
    return matches;
}

// レベル検索関数
function searchLevel(query, monsterList, lebelList) {
    // モンスター名からレベルを検索
    let index = monsterList.indexOf(query);
    if (index !== -1) {
        const level = lebelList[index];
        return { results: [`捕獲レベル: ${level}`], error: null };
    }

    // レベルからモンスター名を検索
    index = lebelList.indexOf(query);
    if (index !== -1) {
        const monsterName = monsterList[index];
        return { results: [`${monsterName}`], error: null };
    }

    return { results: [], error: '見つからないぞ小松！！' };
}

module.exports = { convertToHiragana, searchMonster, searchLevel };