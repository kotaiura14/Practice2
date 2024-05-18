const express = require('express');
const path = require('path');
const kuromoji = require('kuromoji');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// モジュールのインポート
const monsterDict = require('./dict/monsterDict');

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'text')));

// View engine setup
app.set('views', path.join(__dirname, 'text'));
app.set('view engine', 'ejs');

// Kuromoji setup
kuromoji.builder({ dicPath: 'text/dict' }).build((err, tokenizer) => {
    if (err) {
        console.error('Error initializing kuromoji tokenizer:', err);
        return;
    }
    app.locals.tokenizer = tokenizer;
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { error: null, difficulty: '', questionCount: '' });
});

app.use('/search', require('./routes/search'));
app.use('/search-lebel', require('./routes/searchLevel'));
app.use('/quiz', require('./routes/quizLink'));
app.use('/quizPage', require('./routes/quizPage'));
app.use('/scorePage', require('./routes/quizScore'));

// Global variables
app.locals.monsterDict = monsterDict;

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
