const fs = require('fs');
const { getHotWords } = require('./hotMongo');

// ホットワードのデータを更新し、JSONファイルに書き込む関数
async function updateHotWordsJSON() {
    try {
        const hotWords = await getHotWords();
        fs.writeFileSync('./hotwords.json', JSON.stringify(hotWords, null, 2));
        console.log('Hot words data written to hotwords.json');
    } catch (error) {
        console.error('Error updating hot words:', error);
    }
}

// 定期的な更新処理
function startHotWordsUpdateInterval() {
    setInterval(updateHotWordsJSON, 60000); // 60秒ごとに更新
}

module.exports = { startHotWordsUpdateInterval };
