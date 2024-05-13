const sumList = require('../list/sumList');

function generateQuiz(difficulty, questionCount) {
    let quizzes = []; // クイズの配列をローカルで定義

    let errorMargin;
    switch (difficulty) {
        case 'easy':
            errorMargin = 0.3; // ±30%
            break;
        case 'medium':
            errorMargin = 0.2; // ±20%
            break;
        case 'hard':
            errorMargin = 0.1; // ±10%
            break;
        case 'impossible':
            errorMargin = 0.05; // ±5%
            break;
        default:
            throw new Error('Invalid difficulty level');
    }

    const totalQuestions = parseInt(questionCount);

    // 重複を避けてクイズを生成
    while (quizzes.length < totalQuestions) {
        let randomIndex = Math.floor(Math.random() * sumList.length);
        let [randomMonster, level] = sumList[randomIndex].split(', ');

        // すでに存在する問題かどうかをチェック
        if (quizzes.some(quiz => quiz.question === randomMonster)) {
            continue; // すでに存在する場合はスキップして次の問題を生成
        }

        let choices = [];
        let correctLevel;

        if (level === '不明' || level === '測定不能') {
            choices = generateRandomThreeDigitChoices();
            correctLevel = level;
        } else if (level === '1以下') {
            choices = generateChoicesForOneOrLess();
            correctLevel = "1以下";
        } else {
            correctLevel = parseFloat(level);
            if (correctLevel < 10) { // 1桁の場合の処理
                choices = generateChoicesForSingleDigit(correctLevel);
            } else {
                choices = generateChoicesInRange(correctLevel, errorMargin);
            }
        }

        const correctIndex = choices.findIndex(choice => choice === correctLevel.toString());

        quizzes.push({
            question: randomMonster,
            choices: choices,
            correctIndex: correctIndex,
            correctLevel: correctLevel,
        });
    }

    console.log('Quizzes generated:', quizzes); // ログを追加

    return quizzes;
}

// 3桁のランダムな選択肢を生成する関数
function generateRandomThreeDigitChoices() {
    const choices = ["不明"];
    const existingNumbers = new Set();
    existingNumbers.add(1);
    for (let i = 0; i < 3; i++) {
        let randomChoice;
        do {
            randomChoice = Math.floor(Math.random() * 900) + 100; // 100から999までのランダムな数値
        } while (existingNumbers.has(randomChoice));
        existingNumbers.add(randomChoice);
        choices.push(randomChoice.toString());
    }
    
    // 選択肢をシャッフルする
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    return choices;
}




// 1以下の選択肢を生成する関数
function generateChoicesForOneOrLess() {
    const choices = ["1以下"];
    const existingNumbers = new Set();
    existingNumbers.add(1);
    for (let i = 0; i < 3; i++) {
        let randomChoice;
        do {
            randomChoice = Math.floor(Math.random() * 9) + 1; // 1から9までのランダムな数値
        } while (existingNumbers.has(randomChoice));
        existingNumbers.add(randomChoice);
        choices.push(randomChoice.toString());
    }
    
    // 選択肢をシャッフルする
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    return choices;
}


// 1桁の選択肢を生成する関数
function generateChoicesForSingleDigit(correctLevel) {
    const choices = [];
    const digits = [];
    for (let i = 1; i <= 9; i++) {
        if (i !== correctLevel) {
            digits.push(i);
        }
    }
    choices.push(correctLevel.toString()); // 正解の数値を先頭に挿入
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        choices.push(digits[randomIndex].toString());
        digits.splice(randomIndex, 1);
    }
    return choices;
}

// 2桁の選択肢を生成する関数
function generateChoicesForDoubleDigit(correctLevel) {
    const choices = [];
    for (let i = 0; i < 4; i++) {
        let randomChoice = Math.floor(Math.random() * 100); // 0から99までのランダムな数値
        randomChoice = avoidDuplicates(choices, randomChoice); // 重複を避ける
        choices.push(randomChoice.toString().padStart(2, '0')); // 2桁の数値に変換
    }
    const correctIndex = Math.floor(Math.random() * 4);
    choices[correctIndex] = correctLevel.toString().padStart(2, '0'); // 正解の数値に変換
    return choices;
}

// 範囲内の選択肢を生成する関数
function generateChoicesInRange(correctLevel, errorMargin) {
    const errorMarginValue = Math.floor(errorMargin * correctLevel);
    const minRandomLevel = Math.max(1, correctLevel - errorMarginValue);
    const maxRandomLevel = Math.min(10, correctLevel + errorMarginValue);
    const choices = [];
    for (let j = 0; j < 4; j++) {
        let randomChoice = Math.round(Math.random() * (maxRandomLevel - minRandomLevel)) + minRandomLevel;
        choices.push(randomChoice.toString());
    }
    const correctIndex = Math.floor(Math.random() * 4);
    choices[correctIndex] = correctLevel.toString();
    return choices;
}

module.exports = generateQuiz;