// 写経のページの動き。サーバーは使わず、ブラウザの中だけで動く。

// 回の一覧。回を足すときは、lessons/ にファイルを置いて、ここに1行足す。
const LESSON_IDS = ['01-page'];

const STORE_KEY = 'threejs-game:shakyo:v1';

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s && s.code && s.done) return s;
  } catch (e) { /* 保存が使えないときは、保存なしで動かす */ }
  return { code: {}, done: {} };
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* 同上 */ }
}
const state = loadState();

const cache = {};
async function getLesson(id) {
  if (!cache[id]) cache[id] = (await import(`./lessons/${id}.js`)).default;
  return cache[id];
}

const $ = (id) => document.getElementById(id);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 前の歩のコードと比べて、この歩で増えた行の番号を返す（行ごとの最長共通部分列）。
function addedLines(before, after) {
  const A = before === '' ? [] : before.split('\n');
  const B = after.split('\n');
  const n = A.length, m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const added = new Set();
  let i = 0, j = 0;
  while (j < m) {
    if (i < n && A[i] === B[j]) { i++; j++; }
    else if (i < n && dp[i + 1][j] >= dp[i][j + 1]) { i++; }
    else { added.add(j); j++; }
  }
  return added;
}

// 空の行を飛ばし、行の前後の空白は見ないで比べる。字下げのずれでは止めない。
function meaningfulLines(text) {
  return text.replace(/\r/g, '').split('\n')
    .map((t, i) => ({ t: t.trim(), no: i + 1 }))
    .filter((l) => l.t !== '');
}
function compare(user, target) {
  const U = meaningfulLines(user);
  const T = meaningfulLines(target);
  const n = Math.max(U.length, T.length);
  for (let k = 0; k < n; k++) {
    const u = U[k], t = T[k];
    if (!u || !t || u.t !== t.t) {
      return {
        ok: false,
        done: k,
        total: T.length,
        userLine: u ? u.no : null,
        expected: t ? t.t : null,
        got: u ? u.t : null,
      };
    }
  }
  return { ok: true, total: T.length };
}

// ---- 一覧 ----
async function showList() {
  $('lesson-view').hidden = true;
  $('list-view').hidden = false;
  document.title = '写経で学ぶ Three.js';
  const items = [];
  for (const id of LESSON_IDS) {
    const L = await getLesson(id);
    const done = L.steps.filter((_, i) => state.done[`${id}/${i}`]).length;
    items.push(`<li><a href="#/${id}/1">
      <span class="num">第${esc(L.number)}回</span>
      <span class="title">${esc(L.title)}</span>
      <span class="meta">${esc(L.summary)}　${done} / ${L.steps.length} 歩</span>
    </a></li>`);
  }
  $('lesson-list').innerHTML = items.join('');
}

// ---- 1つの歩 ----
let current = null;

async function showLesson(id, stepNo) {
  const L = await getLesson(id);
  const idx = Math.min(Math.max(stepNo - 1, 0), L.steps.length - 1);
  const step = L.steps[idx];
  const before = idx === 0 ? (L.start || '') : L.steps[idx - 1].code;
  const key = `${id}/${idx}`;
  current = { L, id, idx, step, before, key };

  $('list-view').hidden = true;
  $('lesson-view').hidden = false;
  document.title = `${step.title}｜写経で学ぶ Three.js`;

  $('step-nav').innerHTML = L.steps.map((s, i) => {
    const cls = [i === idx ? 'current' : '', state.done[`${id}/${i}`] ? 'done' : ''].join(' ');
    return `<a class="${cls}" href="#/${id}/${i + 1}">${i + 1}</a>`;
  }).join('');
  $('step-title').textContent = `第${L.number}回 ${L.title}　${idx + 1}. ${step.title}`;
  $('step-body').innerHTML = step.body;

  const added = addedLines(before, step.code);
  $('sample').innerHTML = step.code.split('\n').map((line, i) =>
    `<span class="ln${added.has(i) ? ' added' : ''}"><span class="no">${i + 1}</span>${esc(line)}</span>`
  ).join('');

  $('step-care').innerHTML = step.care ? `<h3>気をつけるところ</h3>${step.care}` : '';
  $('step-care').hidden = !step.care;
  $('step-try').innerHTML = step.try ? `<h3>変えてみよう</h3>${step.try}` : '';
  $('step-try').hidden = !step.try;

  $('sources').innerHTML = `<summary>この回の出典（確認した日 ${esc(L.checked)}）</summary><ul>${
    L.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')
  }</ul>`;

  $('prev').disabled = idx === 0;
  $('next').textContent = idx === L.steps.length - 1 ? '一覧へ' : '次の歩';

  const ta = $('code');
  ta.value = state.code[key] ?? before;
  ta.scrollTop = 0;
  check();
  run();
  window.scrollTo(0, 0);
}

function renderGutter(badLine) {
  const n = $('code').value.split('\n').length;
  const out = [];
  for (let i = 1; i <= n; i++) out.push(i === badLine ? `<span class="bad">${i}</span>` : String(i));
  $('gutter').innerHTML = out.join('\n') + '\n';
  $('gutter').scrollTop = $('code').scrollTop;
}

function check() {
  if (!current) return;
  const r = compare($('code').value, current.step.code);
  const st = $('status');
  if (r.ok) {
    st.className = 'status ok';
    st.textContent = '見本と一致したよ。実行して、結果を見てみよう。';
    if (!state.done[current.key]) {
      state.done[current.key] = true;
      saveState();
      const a = $('step-nav').children[current.idx];
      if (a) a.classList.add('done');
    }
    renderGutter(null);
    return;
  }
  st.className = 'status bad';
  let msg = `${r.total} 行のうち ${r.done} 行まで一致。`;
  if (r.got === null) msg += `次は「${r.expected}」を打とう。`;
  else if (r.expected === null) msg += `${r.userLine} 行目から先は、見本に無い行だよ。`;
  else msg += `${r.userLine} 行目がちがうよ。見本は「${r.expected}」。`;
  st.textContent = msg;
  renderGutter(r.userLine);
}

function run() {
  $('result').srcdoc = $('code').value;
}

// ---- 打つ欄の操作 ----
const ta = $('code');
ta.addEventListener('input', () => {
  if (!current) return;
  state.code[current.key] = ta.value;
  saveState();
  check();
});
ta.addEventListener('scroll', () => { $('gutter').scrollTop = ta.scrollTop; });
ta.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !e.shiftKey) {
    // Tab で欄の外に出ず、空白2つを入れる
    e.preventDefault();
    ta.setRangeText('  ', ta.selectionStart, ta.selectionEnd, 'end');
    ta.dispatchEvent(new Event('input'));
  }
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); run(); }
});

// スマホ向けの記号ボタン。押しても欄から指が離れないよう、押した瞬間の動きを止める。
$('keybar').addEventListener('pointerdown', (e) => {
  if (e.target.closest('button')) e.preventDefault();
});
$('keybar').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-ins]');
  if (!b) return;
  ta.focus();
  ta.setRangeText(b.dataset.ins, ta.selectionStart, ta.selectionEnd, 'end');
  ta.dispatchEvent(new Event('input'));
});

$('run').addEventListener('click', run);
$('reset').addEventListener('click', () => {
  if (!current) return;
  ta.value = current.before;
  delete state.code[current.key];
  saveState();
  check();
  run();
});
$('prev').addEventListener('click', () => {
  if (current && current.idx > 0) location.hash = `#/${current.id}/${current.idx}`;
});
$('next').addEventListener('click', () => {
  if (!current) return;
  if (current.idx < current.L.steps.length - 1) location.hash = `#/${current.id}/${current.idx + 2}`;
  else location.hash = '#/';
});

// ---- 道案内 ----
function route() {
  const m = location.hash.match(/^#\/([\w-]+)\/(\d+)$/);
  if (m && LESSON_IDS.includes(m[1])) showLesson(m[1], Number(m[2]));
  else { current = null; showList(); }
}
window.addEventListener('hashchange', route);
route();
