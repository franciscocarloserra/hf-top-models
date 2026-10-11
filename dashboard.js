// Dashboard view: 9 Observable Plot charts over data/models.json, filterable by theme. Points link to the model page.
const CUT = 50;    // default top-N by likes; applies to every chart
const PUBS = 10;   // publishers shown in the publisher chart
const LABELS = 8;  // labeled points in "Top releases"
const H = 230;     // default chart height
// pipeline_tag -> theme; anything unlisted (or untyped) is "Other" and left out of theme charts
const THEME = {
  'text-generation': 'LLM',
  'image-text-to-text': 'VLM', 'any-to-any': 'VLM', 'video-text-to-text': 'VLM', 'image-to-text': 'VLM',
  'text-to-image': 'Image', 'image-to-image': 'Image', 'image-text-to-image': 'Image',
  'text-to-video': 'Video', 'image-to-video': 'Video', 'image-text-to-video': 'Video', 'video-to-video': 'Video',
  'text-to-speech': 'Speech', 'automatic-speech-recognition': 'Speech', 'text-to-audio': 'Speech', 'audio-to-audio': 'Speech',
};
const THEMES = ['LLM', 'VLM', 'Image', 'Video', 'Speech'];
const COLORS = ['#6fa8dc', '#8e7cc3', '#e69138', '#c27ba0', '#6aa84f'];

let Plot, all, rows, cut = CUT, timer;
const themes = new Set();
const url = d => `https://huggingface.co/${d.id}`;
const fmt = n => n == null ? '—' : n >= 1e9 ? +(n / 1e9).toFixed(1) + 'B' : n >= 1e6 ? +(n / 1e6).toFixed(1) + 'M'
  : n >= 1e3 ? +(n / 1e3).toFixed(1) + 'k' : +(+n).toFixed(n < 10 ? 1 : 0);
const short = s => s.length > 24 ? s.slice(0, 23) + '…' : s;
const tip = d => `${d.id}\n${d.type || 'no type'} · ${d.created}\n${fmt(d.likes)} likes · ${fmt(d.downloads_30d)} dl/30d · ${fmt(d.params)} params`;
const topBy = (a, f, n) => [...a].sort((x, y) => y[f] - x[f]).slice(0, n);
const base = (w, h = H) => ({ width: w, height: h, marginTop: 10, marginRight: 10,
  style: { background: 'transparent', color: '#888', fontSize: '10px' },
  color: { domain: [...THEMES, 'Other'], range: [...COLORS, '#666'] } });
const DATE = { type: 'utc', ticks: 5, tickFormat: "%b '%y", label: null };
const LOG = (label, o) => ({ type: 'log', label, labelArrow: 'none', tickFormat: fmt, ticks: 4, ...o });
const link = { href: url, target: '_blank', title: tip, tip: true };

const CHARTS = [
  ['Releases by theme', w => {
    const d = rows.filter(r => r.theme != 'Other');
    return Plot.plot({ ...base(w, 190), marginLeft: 50, x: DATE, y: { domain: THEMES, label: null }, r: { range: [2, 12] },
      marks: [Plot.dot(d, { x: 'date', y: 'theme', r: 'likes', fill: 'theme', fillOpacity: .75, ...link })] });
  }],
  ['Top releases', w => {
    const d = rows;
    return Plot.plot({ ...base(w), x: { ...DATE, inset: 10 }, y: LOG(null, { grid: true }),
      marks: [Plot.dot(d, { x: 'date', y: 'likes', fill: 'theme', r: 4, ...link }),
        Plot.text(d.slice(0, LABELS), { x: 'date', y: 'likes', text: d => short(d.model), dx: 7, textAnchor: 'start', fontSize: 9, fill: '#aaa' })] });
  }],
  ['Releases per month', w =>
    Plot.plot({ ...base(w), x: DATE, y: { grid: true, label: null, ticks: 4 },
      marks: [Plot.rectY(rows, Plot.binX({ y: 'count' }, { x: 'date', fill: 'theme', interval: 'month', inset: 1, tip: true }))] })],
  ['Likes vs downloads', w =>
    Plot.plot({ ...base(w), x: LOG(null), y: LOG(null, { grid: true }),
      marks: [Plot.dot(rows.filter(r => r.downloads_30d > 0), { x: 'likes', y: 'downloads_30d', fill: 'theme', r: 3, ...link })] })],
  ['Size vs likes', w =>
    Plot.plot({ ...base(w), x: LOG(null), y: LOG(null, { grid: true }),
      marks: [Plot.dot(rows.filter(r => r.params), { x: 'params', y: 'likes', fill: 'theme', r: 3, ...link })] })],
  ['Top publishers', w => {
    const tot = {}; rows.forEach(r => tot[r.publisher] = (tot[r.publisher] || 0) + r.likes);
    const top = Object.keys(tot).sort((a, b) => tot[b] - tot[a]).slice(0, PUBS);
    return Plot.plot({ ...base(w), marginLeft: 100, x: { grid: true, label: null, tickFormat: fmt, ticks: 4 }, y: { domain: top, label: null },
      marks: [Plot.barX(rows.filter(r => top.includes(r.publisher)), { x: 'likes', y: 'publisher', fill: 'theme', stroke: '#161616', ...link })] });
  }],
  ['Likes per day', w => {
    const d = topBy(rows, 'perDay', 20);
    return Plot.plot({ ...base(w, 13 * d.length + 30), marginLeft: 150, x: { grid: true, label: null, tickFormat: fmt, ticks: 4 },
      y: { domain: d.map(r => r.id), label: null, tickFormat: id => short(id.split('/')[1]) },
      marks: [Plot.barX(d, { x: 'perDay', y: 'id', fill: 'theme', ...link })] });
  }],
  ['LLM / VLM size', w =>
    Plot.plot({ ...base(w), x: DATE, y: LOG(null, { grid: true }), r: { range: [2, 12] },
      marks: [Plot.dot(rows.filter(r => r.params && (r.theme == 'LLM' || r.theme == 'VLM')), { x: 'date', y: 'params', r: 'likes', fill: 'theme', fillOpacity: .75, ...link })] })],
  ['Openness', w => {
    const d = THEMES.flatMap(t => { const a = rows.filter(r => r.theme == t);
      return a.length ? [['paper', a.filter(r => r.papers.length).length / a.length], ['train code', a.filter(r => r.train_code).length / a.length]]
        .map(([k, v]) => ({ theme: t, kind: k, share: v, n: a.length })) : [] });
    return Plot.plot({ ...base(w, 190), marginLeft: 50, marginRight: 70, x: { domain: [0, 1], axis: null }, y: { domain: THEMES, label: null }, fy: { label: null },
      marks: [Plot.barX(d, { x: 'share', y: 'theme', fy: 'kind', fill: 'theme' }),
        Plot.text(d, { x: 'share', y: 'theme', fy: 'kind', text: d => `${Math.round(d.share * 100)}% of ${d.n}`, dx: 4, textAnchor: 'start', fill: '#aaa' })] });
  }],
];

function chips() {
  document.getElementById('filters').innerHTML = THEMES.map((t, i) =>
    `<button class="chip${themes.has(t) ? ' on' : ''}" data-k="${t}"><i style="background:${COLORS[i]}"></i>${t}</button>`).join('');
}

function render() {
  rows = topBy(all.filter(r => !themes.size || themes.has(r.theme)), 'likes', cut);
  const grid = document.getElementById('charts');
  grid.innerHTML = '';
  for (const [title, fn] of CHARTS) {
    const card = grid.appendChild(document.createElement('div'));
    card.className = 'card';
    card.innerHTML = `<h4>${title}</h4>`;
    card.append(fn(card.clientWidth - 24));
  }
}

export async function show() {
  if (!Plot) {
    Plot = await import('https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm');
    const now = Date.now();
    all = (await window.dataP).models.map(r => ({ ...r, theme: THEME[r.type] || 'Other', date: new Date(r.created),
      perDay: r.likes / Math.max(1, (now - Date.parse(r.created)) / 864e5) }));
    const s = document.getElementById('cut');
    s.max = all.length; s.value = cut; document.getElementById('cutv').textContent = cut; s.oninput = () => { cut = +s.value; document.getElementById('cutv').textContent = cut; render(); };
    document.getElementById('filters').onclick = e => {
      const k = e.target.closest('button')?.dataset.k; if (!k) return;
      themes.has(k) ? themes.delete(k) : themes.add(k);
      chips(); render();
    };
    addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(() => document.getElementById('dash').offsetParent && render(), 200); });
    chips();
  }
  render();
}
