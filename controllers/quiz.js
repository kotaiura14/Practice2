function handleQuizSubmission(event) {
    event.preventDefault(); // デフォルトのフォーム送信を停止

    const form = document.getElementById('quizForm');
    const formData = new FormData(form); // フォームデータを取得

    // フォームデータを配列に変換
    const answers = [];
    const quizzes = []; // クイズの情報を格納する配列を定義

    formData.forEach((value, key) => {
        // key の形式は 'answers[0]'、'answers[1]' または 'quizzes[0]'、'quizzes[1]' などとなる
        const index = parseInt(key.match(/\d+/)[0]); // インデックスを抽出

        if (key.startsWith('answers')) {
            if (!answers[index]) {
                answers[index] = { selected: value }; // 新しいオブジェクトを作成
            } else {
                answers[index].selected = value; // すでに存在する場合は値を更新
            }
        } else if (key.startsWith('quizzes')) {
            // クイズの情報を取得して配列に格納
            quizzes[index] = { correctLevel: value }; // クイズのデータを追加
        }
    });

    // サーバーに回答とクイズを送信するためのリクエストを作成
    const url = '/scorePage';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: answers, quizzes: quizzes }) // 回答とクイズを配列として送信
    };

    // ログを出力
    console.log("Answers:", answers);
    console.log("Quizzes:", quizzes);

    // サーバーにリクエストを送信
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // サーバーからのレスポンスを処理する
            console.log("Server response:", data);
            // ここで必要な処理を行う
        })
        .catch(error => {
            // エラーが発生した場合の処理
            console.error('There was a problem with the fetch operation:', error);
        });
}
