// slang.jsonからランダムに3つ選び、id="randoms"に表示

fetch('slang.json')
  .then(response => response.json())
  .then(data => {
    // データをシャッフルして3つ選ぶ
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const randomsElem = document.getElementById('randoms');
    randomsElem.innerHTML = ''; // 既存をクリア

    selected.forEach(item => {
      // categoryが配列の場合も考慮
      const categories = Array.isArray(item.category) ? item.category : [item.category];

      // タグHTML生成
      const tagsHtml = categories.map(cat => 
        `<div class="tag"><p>${cat}</p></div>`
      ).join('');

      // セクションHTML生成
      const section = document.createElement('section');
      section.innerHTML = `
        <div class="h2-tags">
          <h2>${item.term}</h2>
          ${tagsHtml}
        </div>
        <p>${item.meaning}</p>
      `;
      randomsElem.appendChild(section);
    });
  })
  .catch(err => {
    console.error('slang.jsonの読み込みに失敗しました:', err);
    const randomsElem = document.getElementById('randoms');
    randomsElem.innerHTML = '<p>スラングの読み込みに失敗しました。</p>';
  });