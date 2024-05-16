const sumList = require('../dict/sumList');

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
            choices = generateChoicesInRange(correctLevel, errorMargin);
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

// 不明、測定不能の時
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

function generateRandomThreeDigitChoices() {
    const choices = ["測定不能"];
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

// 範囲内の選択肢を生成する関数
function generateChoicesInRange(correctLevel, errorMargin) {
    const errorMarginValue = Math.floor(errorMargin * correctLevel);
    let minRandomLevel = Math.max(1, correctLevel - errorMarginValue);
    let maxRandomLevel = correctLevel + errorMarginValue;

    // 4つの異なる選択肢を保証するために、範囲を広げる
    while (maxRandomLevel - minRandomLevel < 3) {
        maxRandomLevel++;
        if (minRandomLevel > 1) minRandomLevel--;
    }

    // ランダム生成用配列を作成
    let numberArray = [];
    for (let i = minRandomLevel; i <= maxRandomLevel; i++) {
        numberArray.push(i);
    }

    // エラーチェック: numberArrayが空でないことを確認
    if (numberArray.length < 4) {
        throw new Error("範囲内の値が少なすぎます。エラーマージンを広げてください。");
    }

    // 重複を避けてランダムに値を選択
    let choices = [];
    const existingNumbers = new Set([correctLevel]);
    for (let j = 0; j < 3; j++) {
        let randomChoice;
        do {
            randomChoice = numberArray[Math.floor(Math.random() * numberArray.length)];
        } while (existingNumbers.has(randomChoice));
        existingNumbers.add(randomChoice);
        choices.push(randomChoice.toString());
    }

    // 正解の位置をランダムに決定し挿入
    const correctIndex = Math.floor(Math.random() * 4);
    choices.splice(correctIndex, 0, correctLevel.toString());

    return choices;
}





module.exports = generateQuiz;
