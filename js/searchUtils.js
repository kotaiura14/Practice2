const tokenizer = require('kuromoji');

function convertToHiragana(query) { 
    const tokens = tokenizer.tokenize(query);
    let hiragana = '';
    for (const token of tokens) {
        if (token.reading) {
            hiragana += token.reading;
        } else {
            hiragana += token.surface_form;
        }
    }
    return hiragana;
}

function searchMonster(query) { 
    const normalizedQuery = convertToHiragana(query);
    const matches = monsterList.filter(monster => {
        const hiraganaMonster = convertToHiragana(monster);
        return hiraganaMonster.startsWith(normalizedQuery);
    });
    return matches;
}

function normalizeQuery(query) {
    const normalizedQuery = query.split('').map(char => {
        if (char in kanaMap) {
            return kanaMap[char];
        }
        return char;
    }).join('');
    return normalizedQuery;
}

module.exports = {
    convertToHiragana,
    searchMonster,
    normalizeQuery
};
