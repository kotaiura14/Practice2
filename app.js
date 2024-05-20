const express = require('express');
const path = require('path');
const kuromoji = require('kuromoji');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();
const { getHotWords } = require('./controllers/hotword/hotMongo');
const { startHotWordsUpdateInterval } = require('./controllers/hotword/hotwordsUpdater');

const PORT = 3000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'text')));

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
app.get('/', async (req, res) => {
    try {
        const hotWords = await getHotWords();
        res.render('index', { hotWords: hotWords });
    } catch (error) {
        console.error('Error fetching hot words:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/search', require('./routes/search'));
app.use('/search-lebel', require('./routes/searchLevel'));
app.use('/quiz', require('./routes/quizLink'));
app.use('/quizPage', require('./routes/quizPage'));
app.use('/scorePage', require('./routes/quizScore'));

// Global variables
app.locals.monsterDict = require('./dict/monsterDict');

//MongoDBに接続
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB Connected'));

// ログの設定
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

startHotWordsUpdateInterval(); // ホットワードの更新処理を開始
