document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search');
    const resultDiv = document.getElementById('result');

    // Enterキーでsearch.indexに遷移
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            window.location.href = 'search.html';
        }
    });

    // 入力ごとに検索
    input.addEventListener('input', async () => {
        const keyword = input.value.trim().toLowerCase();
        if (!keyword) {
            resultDiv.innerHTML = '';
            return;
        }
        const res = await fetch('slang.json');
        const data = await res.json();

        const filtered = data.filter(item => {
            const termMatch = item.term.toLowerCase().includes(keyword);
            const readingMatch = item.reading.toLowerCase().includes(keyword);
            const categoryMatch = item.category.some(cat => cat.toLowerCase().includes(keyword));
            return termMatch || readingMatch || categoryMatch;
        });

        resultDiv.innerHTML = filtered.map(item => {
            const tagsHtml = item.category.map(tag => `<span class="tag">${tag}</span>`).join(' ');
            return `<div class="h2-tags"><h2>${item.term}</h2>${tagsHtml}</div><p>${item.meaning}</p>`;
        }).join('');
    });
});