const terms = [/* JSONデータをここに入れるか fetch() で読み込みます */];

const input = document.getElementById("search");
const results = document.getElementById("results");

input.addEventListener("input", () => {
    const query = input.value.trim();
    results.innerHTML = "";
    if (query === "") return;

    const filtered = terms.filter(t =>
    t.term.includes(query) || t.reading.includes(query) || t["read-en"].includes(query)
    );

    if (filtered.length === 0) {
    results.innerHTML = "<p>該当する用語が見つかりませんでした。</p>";
    return;
    }

    filtered.forEach(term => {
    const el = document.createElement("div");
    el.className = "term-card";
    el.innerHTML = `
        <div class="term-title">${term.term}</div>
        <div class="term-tags">${term.category?.join(", ") || ""}</div>
        <div class="term-meaning">${term.meaning}</div>
    `;
    results.appendChild(el);
    });
});