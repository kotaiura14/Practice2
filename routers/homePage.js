const express = require('express');
const router = express.Router();
const pass = require('path');

router.get('/', async (req, res) => {
    res.sendFile(pass.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;


// res.sendFile('index.html', {results: null, error: null, difficulty: '', questionCount: ''});
