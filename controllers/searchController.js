
// 検索関数
function searchMonster(query, monsterDict_copy) {
    let results = [];
    for (const [key, value] of Object.entries(monsterDict_copy)) {
            if (value.name.startsWith(query) || value.hiragana.startsWith(query)) {
                results.push({name: key,  level:value.level});
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
        if (value.level === query) {
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