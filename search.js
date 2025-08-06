document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('search');
    const resultDiv = document.getElementById('result');

    // URLパラメータからキーワード取得
    const params = new URLSearchParams(window.location.search);
    const urlKeyword = params.get('keyword');
    if (urlKeyword) {
        input.value = urlKeyword;
        await searchAndDisplay(urlKeyword);
    }

    // Enterキーでsearch.indexに遷移
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const keyword = input.value.trim();
            if (keyword) {
                window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
            } else {
                window.location.href = 'search.html';
            }
        }
    });

    // 入力ごとに検索
    input.addEventListener('input', async () => {
        const keyword = input.value.trim().toLowerCase();
        await searchAndDisplay(keyword);
    });

    async function searchAndDisplay(keyword) {
        if (!keyword) {
            resultDiv.innerHTML = '';
            return;
        }
        const res = await fetch('slang.json');
        const data = await res.json();

        const filtered = data.filter(item => {
            const termMatch = item.term.toLowerCase().includes(keyword.toLowerCase());
            const readingMatch = item.reading.toLowerCase().includes(keyword.toLowerCase());
            const categoryMatch = item.category.some(cat => cat.toLowerCase().includes(keyword.toLowerCase()));
            return termMatch || readingMatch || categoryMatch;
        });

        resultDiv.innerHTML = filtered.map(item => {
            const tagsHtml = item.category.map(tag => `<span class="tag">${tag}</span>`).join(' ');
            return `<div class="h2-tags"><h2>${item.term}</h2>${tagsHtml}</div><p>${item.meaning}</p>`;
        }).join('');
    }
});