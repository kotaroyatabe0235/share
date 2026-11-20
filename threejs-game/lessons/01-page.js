// 第1回：ページとは何か
// 文の中の HTML は、このファイルを書いた側が用意したものだけを入れる。

export default {
  id: '01-page',
  number: '1',
  title: 'ページとは何か',
  summary: 'HTML でページの骨組みを書き、CSS で見た目を変える',
  start: '',
  checked: '2026-11-20',
  sources: [
    { label: 'MDN：HTML の基本', url: 'https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content' },
    { label: 'MDN：Doctype', url: 'https://developer.mozilla.org/ja/docs/Glossary/Doctype' },
    { label: 'MDN：<meta> の charset 属性', url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/meta' },
    { label: 'MDN：<title>', url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/title' },
    { label: 'MDN：lang 属性', url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/lang' },
    { label: 'MDN：空要素', url: 'https://developer.mozilla.org/ja/docs/Glossary/Void_element' },
    { label: 'MDN：HTML のデバッグ', url: 'https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content/Debugging_HTML' },
    { label: 'MDN：CSS の基本', url: 'https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content' },
    { label: 'MDN：<style>', url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/style' },
    { label: 'MDN：HTML、CSS、DOM でのホワイトスペースの扱い', url: 'https://developer.mozilla.org/ja/docs/Web/CSS/Guides/Text/Whitespace' },
    { label: 'MDN：CSS のエラー処理', url: 'https://developer.mozilla.org/ja/docs/Web/CSS/Guides/Syntax/Error_handling' },
    { label: 'MDN：名前付き色', url: 'https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Values/named-color' },
  ],
  steps: [
    {
      title: 'いちばん小さなページ',
      body: `
<p>Web のページは、<b>HTML</b> という書き方で書いた文字のファイルです。ブラウザはこのファイルを読んで、画面に表示します。</p>
<p>HTML は、中身を <b>タグ</b> ではさんで書きます。たとえば <code>&lt;h1&gt;こんにちは&lt;/h1&gt;</code> は、「こんにちは」を見出しにします。<code>&lt;h1&gt;</code> が始まりのタグ、<code>&lt;/h1&gt;</code> が終わりのタグです。始まりから終わりまでのひとまとまりを <b>要素</b> と呼びます。</p>
<p>見本の各行の役目です。</p>
<ul>
  <li><code>&lt;!doctype html&gt;</code>：ブラウザが、古いページ向けの表示の仕方（互換モード）に切り替わらないようにするための1行です。</li>
  <li><code>&lt;html lang="ja"&gt;</code>：ページ全体を囲みます。<code>lang="ja"</code> は、このページの言葉が日本語だと伝えます。</li>
  <li><code>&lt;head&gt;</code>：ページの表示領域には出ない、ページについての情報を入れます。</li>
  <li><code>&lt;meta charset="utf-8"&gt;</code>：文字の表し方が UTF-8 だと伝えます。</li>
  <li><code>&lt;title&gt;</code>：ブラウザのタブなどに出る題名です。</li>
  <li><code>&lt;body&gt;</code>：画面に出る中身を入れます。</li>
</ul>
<p>1歩目は、すべての行が新しいので、見本の全部の行に色がついています。打つ欄に、見本を上から打ってみましょう。打ち終わったら「実行」を押します。</p>`,
      code: `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>はじめてのページ</title>
</head>
<body>
  <h1>こんにちは</h1>
</body>
</html>`,
      care: `
<p><code>&lt;meta&gt;</code> には終わりのタグがありません。中身を持たない要素（空要素）は、始まりのタグだけで書きます。</p>
<p>ふつうの文では、行の頭の空白（字下げ）は、ブラウザの表示には効きません。空白はまとめて扱われるからです。字下げは、人が読みやすくするためのものです。この練習でも、字下げのずれは「ちがう」と言いません。</p>`,
      try: `<p><code>こんにちは</code> を別の言葉に変えて、もう一度「実行」を押してみよう（見本とは合わなくなるので、確かめたら戻そう）。</p>`,
    },
    {
      title: '段落を足す',
      body: `
<p>見出しの下に、文を足します。<code>&lt;p&gt;</code> は段落（ひとまとまりの文）を表す要素です。</p>
<p>見本の色のついた行が、前の歩から増えた行です。打つ欄には、はじめて開いたときは、前の歩の見本のコードが入っています。増えた行だけ打ち足しましょう。</p>`,
      code: `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>はじめてのページ</title>
</head>
<body>
  <h1>こんにちは</h1>
  <p>これは、はじめて書いたページです。</p>
  <p>これは、2つめの段落です。</p>
</body>
</html>`,
      care: `
<p>HTML は、書き間違いがあっても、ブラウザがなるべく表示しようとします。そのため、まちがいが画面からはわかりにくいことがあります。この練習の「見本との一致」は、見本とちがうところに気づくための仕組みです。</p>`,
      try: `<p><code>&lt;p&gt;</code> の行をもう1つ足して、段落が増えるのを確かめてみよう（見本とは合わなくなるので、確かめたら消して戻そう）。</p>`,
    },
    {
      title: 'CSS で見た目を変える',
      body: `
<p>HTML はページの <b>中身と骨組み</b> を書くものです。色や大きさなどの <b>見た目</b> は、<b>CSS</b> という別の書き方で決めます。</p>
<p>ここでは、<code>&lt;head&gt;</code> の中に <code>&lt;style&gt;</code> 要素を置いて、その中に CSS を書きます。</p>
<ul>
  <li><code>h1 { color: tomato; }</code>：<code>h1</code> の要素の文字の色を、<code>tomato</code> という名前の色にします。</li>
  <li><code>p { font-size: 20px; }</code>：<code>p</code> の要素の文字の大きさを 20px にします。</li>
  <li>先頭の <code>h1</code> の部分を <b>セレクター</b> と呼びます。どの要素に効かせるかを選びます。</li>
  <li><code>{ }</code> の中に「<b>プロパティ</b>: <b>値</b>;」の形で、何をどう変えるかを書きます。</li>
</ul>`,
      code: `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>はじめてのページ</title>
  <style>
    h1 { color: tomato; }
    p { font-size: 20px; }
  </style>
</head>
<body>
  <h1>こんにちは</h1>
  <p>これは、はじめて書いたページです。</p>
  <p>これは、2つめの段落です。</p>
</body>
</html>`,
      care: `
<p>この見本では、1つの <code>{ }</code> の中に宣言が1つずつです。宣言を2つ以上並べるときは、あいだの <code>;</code>（セミコロン）を忘れないようにしましょう。忘れると、いくつかの宣言がまとめて無視されることがあります。CSS も、読めない部分を飛ばして表示を続けるので、まちがえても何も言われず、ただ効かないことがあります。</p>`,
      try: `<p><code>tomato</code> を <code>royalblue</code> に、<code>20px</code> を <code>28px</code> に変えて実行してみよう（見本とは合わなくなるので、確かめたら戻そう）。</p>`,
    },
  ],
};
