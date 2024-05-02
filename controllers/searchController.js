// Kuromojiを使用してクエリ文字列をひらがなに変換する関数
// function convertToHiragana(query, tokenizer) {
//     //
//     const tokens = tokenizer.tokenize(query);
//     let hiragana = '';
//     for (const token of tokens) {
//         if (token.reading) {
//             // 読みがある場合は読みを利用する
//             hiragana += token.reading;
//         } else {
//             // 読みがない場合は表層形を利用する
//             hiragana += token.surface_form;
//         }
//     }
//     return hiragana;
// }

// 検索関数
function searchMonster(monsterDict, query) {
    let results = []; // 結果を格納する配列
    for (const [key, value] of Object.entries(monsterDict)) {
        if (value.startsWith(query)) {
            results.push(key); // 一致するモンスター名を配列に追加
        }
    }
    if (results.length > 0) {
        return results; // 一致するものがあれば結果の配列を返す
    } else {
        return ["見つからないぞ小松！！"]; // 一致するものがなければエラーメッセージを配列に入れて返す
    }
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
    const matchingMonsters = [];
    for (let i = 0; i < lebelList.length; i++) {
    if (lebelList[i] === query) {
        matchingMonsters.push(monsterList[i]);
    }
    }
    if (matchingMonsters.length > 0) {
        return { results: matchingMonsters, error: null };
    } else {
        return { results: [], error: '見つからないぞ小松！！' }
    }
}

module.exports = {  searchMonster, searchLevel };