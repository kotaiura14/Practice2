document.addEventListener('DOMContentLoaded', async function() {
    const hotwordsList = document.getElementById('hotwords-list');

    async function displayHotWords() {
        try {
            const response = await fetch('./hotwords.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const hotWordsData = await response.json();

            hotwordsList.innerHTML = '';
            hotWordsData.forEach(word => {
                const listItem = document.createElement('li');
                listItem.textContent = `${word._id} (${word.count})`;
                hotwordsList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching hot words:', error);
        }
    }

    displayHotWords();
    setInterval(displayHotWords, 30000); // 30秒ごとに更新
});