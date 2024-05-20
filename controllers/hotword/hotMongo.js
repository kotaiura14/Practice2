const SearchResult = require('../../model/user');

async function getHotWords() {
    const results = await SearchResult.aggregate([
        {
            $group: {
                _id: "$name",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $limit: 5
        }
    ]);

    return results;
}

module.exports = { getHotWords };
