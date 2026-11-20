// 第1回：Java と違う JavaScript
// 見本のコードは、テンプレートリテラルの中に書いている。
// 見本に入れるバッククォート・ドル記号＋波かっこ・バックスラッシュは、前にバックスラッシュを付けて書く。

const HEAD = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>JavaScript の練習</title>
</head>
<body>
  <pre id="out"></pre>
  <script>
    const out = document.getElementById('out');
    function show(text) {
      out.textContent += text + '\\n';
    }
`;
const TAIL = `  </script>
</body>
</html>`;

const S1 = `
    let count = 3;
    const name = 'hako';
    show(typeof count);
    show(typeof name);
    count = 'three';
    show(typeof count);
`;
const S2 = `
    show(7 / 2);
    show('5' == 5);
    show('5' === 5);
`;
const S3 = `
    const double = (n) => n * 2;
    const sizes = [1, 2, 3];
    show(sizes.map(double).join(', '));
    const box = { width: 2, height: 1 };
    show(\`幅 \${box.width}、高さ \${box.height}\`);
`;

export default {
  id: '01-js',
  number: '1',
  title: 'Java と違う JavaScript',
  summary: '型を書かない変数、比べ方、数、関数と配列とオブジェクト',
  start: '',
  checked: '2026-11-20',
  sources: [
    { label: 'MDN：<script>', url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/script' },
    { label: 'MDN：JavaScript のデータ型とデータ構造', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Data_structures' },
    { label: 'MDN：let', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/let' },
    { label: 'MDN：const', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const' },
    { label: 'MDN：typeof', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof' },
    { label: 'MDN：Number', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number' },
    { label: 'MDN：BigInt', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt' },
    { label: 'MDN：Math.floor()', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/floor' },
    { label: 'MDN：等価性の比較と同一性', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness' },
    { label: 'MDN：厳密等価 (===)', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_equality' },
    { label: 'MDN：アロー関数', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions' },
    { label: 'MDN：Array.prototype.map()', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map' },
    { label: 'MDN：Array.prototype.join()', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/join' },
    { label: 'MDN：オブジェクト初期化子', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer' },
    { label: 'MDN：テンプレートリテラル', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals' },
    { label: 'MDN：getElementById()', url: 'https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById' },
    { label: 'MDN：textContent', url: 'https://developer.mozilla.org/ja/docs/Web/API/Node/textContent' },
    { label: 'Java 言語仕様 21：5章（代入の文脈）', url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html' },
    { label: 'Java 言語仕様 21：15章（割り算の演算子 15.17.2）', url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html' },
  ],
  steps: [
    {
      title: '変数に型を書かない',
      body: `
<p>JavaScript は、ブラウザの中で動くプログラムの言葉です。ページの中では <code>&lt;script&gt;</code> 要素の中に書きます。</p>
<p>見本の前半の <code>show</code> は、結果をページに1行ずつ出すための、この回の道具です。<code>out.textContent</code> に文字を足しています。中身は次の回でくわしく扱います。</p>
<p>Java との違いは次のとおりです。</p>
<ul>
  <li>変数は <code>let</code> か <code>const</code> で作ります。<code>int</code> や <code>String</code> のような型は書きません。</li>
  <li><code>let</code> の変数には、あとから別の値を入れ直せます。<code>const</code> の変数には入れ直せません。</li>
  <li>型は変数ではなく値のほうに付いています。<code>typeof</code> で、いまの値の型が分かります。</li>
  <li>見本では、数の入っていた <code>count</code> に文字列を入れ直しています。Java ならコンパイルで止まりますが、JavaScript では動きます。</li>
</ul>`,
      code: HEAD + S1 + TAIL,
      care: `
<p>型を書かないぶん、まちがった種類の値が入っても、その場では止まりません。おかしな動きは、あとになって別の場所で表に出ます。迷ったら <code>typeof</code> で確かめましょう。</p>
<p>入れ直さない変数は <code>const</code> にしておくと、うっかり入れ直したときにエラーで気づけます。</p>`,
      try: `<p><code>const name</code> の下に <code>name = 'box';</code> を足して実行してみよう。何も出なくなるのは、<code>const</code> への入れ直しでエラーになり、そこから先が動かないからです（確かめたら消して戻そう）。</p>`,
    },
    {
      title: '数と比べ方',
      body: `
<p>JavaScript のふつうの数は、<code>Number</code> という1つの型です。Java の <code>double</code> と同じような、64ビットの浮動小数点数です。<code>int</code> にあたる、ふだん使う整数だけの型はありません（とても大きな整数のための <code>BigInt</code> という型は別にあります）。</p>
<ul>
  <li>そのため <code>7 / 2</code> は <code>3.5</code> になります。Java で <code>int</code> どうしを割ると、小数点以下が切り捨てられて <code>3</code> になるのとは違います。</li>
  <li><code>==</code> は、型が違うと、型をそろえてから比べます。だから文字列の <code>'5'</code> と数の <code>5</code> が等しいことになります。</li>
  <li><code>===</code> は、型もそろっていないと等しいことになりません。</li>
</ul>`,
      code: HEAD + S1 + S2 + TAIL,
      care: `
<p>比べるときは、ふだんは <code>===</code> を使いましょう。MDN は、ほとんどの場合 <code>==</code> は勧めないとしています。<code>===</code> のほうが、結果を予測しやすいからです。</p>`,
      try: `<p><code>7 / 2</code> を <code>Math.floor(7 / 2)</code> に変えると、小数点以下を切り捨てた <code>3</code> になります。試してみよう（確かめたら戻そう）。</p>`,
    },
    {
      title: '関数と配列とオブジェクト',
      body: `
<ul>
  <li><code>(n) =&gt; n * 2</code> は <b>アロー関数</b> です。関数を短く書く書き方で、関数を値として変数に入れられます。</li>
  <li><code>[1, 2, 3]</code> は配列です。<code>map</code> は、各要素に関数を当てた結果で、新しい配列を作ります。<code>join(', ')</code> は、要素をつないで1つの文字列にします。</li>
  <li><code>{ width: 2, height: 1 }</code> は <b>オブジェクト</b> です。クラスを作らなくても、名前と値の組をその場で作れます。</li>
  <li>バッククォート（<code>\`</code>）で囲んだ文字列は <b>テンプレートリテラル</b> です。<code>\${ }</code> の中に書いた式の値が、文字列に埋めこまれます。</li>
</ul>`,
      code: HEAD + S1 + S2 + S3 + TAIL,
      care: `
<p>バッククォートは、ふつうの引用符（<code>'</code>）とは別の記号です。</p>`,
      try: `<p><code>box</code> に <code>depth: 3</code> を足して、最後の行で奥行きも出してみよう（確かめたら戻そう）。</p>`,
    },
  ],
};
