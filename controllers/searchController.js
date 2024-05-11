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
function searchMonster(query, monsterDict_copy) {
    let results = [];
    for (const [key, value] of Object.entries(monsterDict_copy)) {
            if (value.name.startsWith(query) || value.hiragana.startsWith(query)) {
                results.push({name: key, hiragana: value.hiragana, level:value.level});
        }
    }
    if (results.length > 0) {
        return results;
    } else {
        return [
            {name: "見つからないぞ小松！！", hiragana: ""}];
    }
}




// レベル検索関数
function searchLevel(query, monsterDict_copy) {
    // モンスター名からレベルを検索
    let results = [];
    for (const [key, value] of Object.entries(monsterDict_copy)) {
        if (value.level.startsWith(query)) {
            results.push({name: key, level:value.level})
        }
    }
    if (results.length > 0) {
        return results;
    } else {
        return [
            {name: "見つからないぞ小松！！", level: ""}];
    }
}



module.exports = {  searchMonster, searchLevel };