// 第2回：ページを JavaScript で動かす
// 見本に入れるバッククォート・ドル記号＋波かっこは、前にバックスラッシュを付けて書く。

const C1 = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>ページを動かす</title>
</head>
<body>
  <p id="label">まだ押していない</p>
  <script>
    const label = document.getElementById('label');
    label.textContent = 'JavaScript で書き換えた';
  </script>
</body>
</html>`;

const C2 = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>ページを動かす</title>
</head>
<body>
  <p id="label">まだ押していない</p>
  <button id="btn">押す</button>
  <script>
    const label = document.getElementById('label');
    const btn = document.getElementById('btn');
    let count = 0;
    btn.addEventListener('click', () => {
      count += 1;
      label.textContent = \`\${count} 回押した\`;
    });
  </script>
</body>
</html>`;

const C3 = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>ページを動かす</title>
  <style>
    #box { position: relative; width: 40px; height: 40px; background: tomato; }
  </style>
</head>
<body>
  <p id="label">まだ押していない</p>
  <button id="btn">押す</button>
  <div id="box"></div>
  <button id="left">左へ</button>
  <button id="right">右へ</button>
  <script>
    const label = document.getElementById('label');
    const btn = document.getElementById('btn');
    let count = 0;
    btn.addEventListener('click', () => {
      count += 1;
      label.textContent = \`\${count} 回押した\`;
    });

    const box = document.getElementById('box');
    let x = 0;
    function move(dx) {
      x += dx;
      box.style.left = \`\${x}px\`;
    }
    document.getElementById('left').addEventListener('click', () => move(-20));
    document.getElementById('right').addEventListener('click', () => move(20));
  </script>
</body>
</html>`;

export default {
  id: '02-dom',
  number: '2',
  title: 'ページを JavaScript で動かす',
  summary: '要素をつかむ、書き換える、押されたら動く',
  start: '',
  checked: '2026-11-20',
  sources: [
    { label: 'MDN：<script>（読みこみと実行の順）', url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/script' },
    { label: 'MDN：DOM', url: 'https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model' },
    { label: 'MDN：getElementById()', url: 'https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById' },
    { label: 'MDN：textContent', url: 'https://developer.mozilla.org/ja/docs/Web/API/Node/textContent' },
    { label: 'MDN：addEventListener()', url: 'https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener' },
    { label: 'MDN：HTMLElement.style', url: 'https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/style' },
    { label: 'MDN：<length>', url: 'https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Values/length' },
    { label: 'MDN：position', url: 'https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Properties/position' },
    { label: 'MDN：アロー関数', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions' },
    { label: 'MDN：テンプレートリテラル', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals' },
  ],
  steps: [
    {
      title: '要素をつかんで書き換える',
      body: `
<p>ブラウザは、読みこんだ HTML の要素を、JavaScript から触れる <b>オブジェクト</b> にしてくれます。この仕組みを <b>DOM</b> と呼びます。</p>
<ul>
  <li><code>document.getElementById('label')</code> は、<code>id="label"</code> の付いた要素をつかみます。</li>
  <li><code>textContent</code> に文字列を入れると、その要素の中の文字が置きかわります。</li>
</ul>
<p>実行すると、HTML に書いた「まだ押していない」ではなく、JavaScript で入れた文字が出ます。</p>`,
      code: C1,
      care: `
<p><code>&lt;script&gt;</code> は、つかみたい要素より <b>下</b> に置いています。HTML は上から順に読まれるので、要素より上で動かすと、まだ要素が無くて <code>null</code> が返ります。</p>`,
      try: `<p><code>id</code> を <code>'labell'</code> のようにわざとまちがえて実行してみよう。何も変わらず、文字の書き換えも起きません（確かめたら戻そう）。</p>`,
    },
    {
      title: '押されたら動く',
      body: `
<p><code>addEventListener('click', 関数)</code> で、「押されたら、この関数を呼んで」とブラウザに頼みます。押されるたびに、関数が呼ばれます。</p>
<ul>
    <li><code>count</code> は関数の外にあるので、押すたびに前の値から1ずつ増えていきます。</li>
</ul>`,
      code: C2,
      care: `
<p>関数は、登録したときではなく、押されたときに呼ばれます。上から下へ順に流れるだけでなく、「何かが起きたら動く」書き方もある、ということです。</p>`,
      try: `<p><code>count += 1</code> を <code>count += 10</code> に変えてみよう（確かめたら戻そう）。</p>`,
    },
    {
      title: '箱を動かす',
      body: `
<p>ゲームの操作の芽です。ボタンで、赤い箱を左右に動かします。</p>
<ul>
  <li>CSS で箱に <code>position: relative</code> を付けておくと、<code>left</code> で、元の位置から横にずらせます。</li>
  <li><code>box.style.left</code> に <code>'20px'</code> のような文字列を入れると、その場で CSS が書きかわり、箱が動きます。</li>
  <li><code>move</code> は、動かす量 <code>dx</code> を受け取って、位置 <code>x</code> を足し引きします。左右のボタンは、同じ関数を違う値で呼んでいます。</li>
</ul>`,
      code: C3,
      care: `
<p>CSS の長さには、0 のとき以外は <code>px</code> のような単位が要ります。<code>box.style.left = x</code> のように数だけを入れると、長さとして読めないので効きません。<code>px</code> を付けた文字列にします。</p>
<p>いまは「押した瞬間に1回だけ動く」作りです。押している間なめらかに動かす作り方は、この回では扱いません。</p>`,
      try: `<p>上へ動かすボタンを足してみよう。<code>position: relative</code> の要素は、<code>top</code> で縦にもずらせます（確かめたら戻そう）。</p>`,
    },
  ],
};
