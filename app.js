const express = require('express');
const path = require('path');
const kuromoji = require('kuromoji');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const app = express();
const winston =  require('winston');
const SearchResult = require('./model/user');

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

//MongoDBに接続
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB Connected'))

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

app.post('/users', async (req, res) => {
    const {name, age} = req.body;
    try {
        const user = await userController.createUser(name.age);
        res.json(user);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Server setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
