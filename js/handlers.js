const monsterList = require('./list/monsterList');
const kanaMap = require('./list/kanaList');
const lebelList = require('./list/lebelList');
const { convertToHiragana } = require('./searchUtils');

function root(req, res) {
    res.render('text1', { results: null, error: null });
}

function searchMonster(req, res) {
    const query = req.query.q;
    if (!query) {
        const errorMessage = '何やってんだ小松！！';
        res.render('text1', { results: [], error: errorMessage });
    } else {
        const results = performMonsterSearch(query);
        if (results.length === 0) {
            const errorMessage = '見つからないぞ小松！！';
            res.render('text1', { results: [], error: errorMessage });
        } else {
            res.render('text1', { results: results, error: null });
        }
    }
}

function performMonsterSearch(query) {
    const normalizedQuery = convertToHiragana(query);
    return monsterList.filter(monster => {
        const hiraganaMonster = convertToHiragana(monster);
        return hiraganaMonster.startsWith(normalizedQuery);
    });
}

function searchLebel(req, res) {
    const query = req.query.q;

    if (!query) {
        const errorMessage = '何やってんだ小松！！';
        res.render('text1', { results: [], error: errorMessage });
        return;
    }

    let index = monsterList.indexOf(query);
    if (index !== -1) {
        const level = lebelList[index];
        res.render('text1', { results: [`捕獲レベル: ${level}`], error: null });
        return;
    }

    index = lebelList.indexOf(query);
    if (index !== -1) {
        const monsterName = monsterList[index];
        res.render('text1', { results: [`${monsterName}`], error: null });
        return;
    }

    const errorMessage = '見つからないぞ小松！！';
    res.render('text1', { results: [], error: errorMessage });
}

module.exports = {
    searchMonster,
    searchLebel,
    root
};
