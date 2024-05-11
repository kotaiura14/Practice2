const express = require('express');
const router = express.Router();

/*
 要件

*/


router.post('')


router.get('/', (req, res) => {
    // 検索フォームのみを表示するためのレンダリング
    res.render('searchindex', { search_results: null, error: null });
});

module.exports = router;
