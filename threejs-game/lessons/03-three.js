// 第3回：Three.js で箱を1つ出す
// 見本に入れるバッククォート・ドル記号＋波かっこは、前にバックスラッシュを付けて書く。

const HEAD = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>はじめての3D</title>
  <style>
    body { margin: 0; }
    #info { position: absolute; margin: 8px; color: gray; }
  </style>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js"
      }
    }
  </script>
</head>
<body>
  <p id="info"></p>
  <script type="module">
    import * as THREE from 'three';

    document.getElementById('info').textContent = \`three.js r\${THREE.REVISION}\`;
`;
const TAIL = `  </script>
</body>
</html>`;

const SETUP = `
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);
`;

const BOX_NORMAL = `
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    box.rotation.x = 0.5;
    box.rotation.y = 0.7;
    scene.add(box);

    renderer.render(scene, camera);
`;

const BOX_LIT = `
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 'tomato' });
    const box = new THREE.Mesh(geometry, material);
    box.rotation.x = 0.5;
    box.rotation.y = 0.7;
    scene.add(box);

    const light = new THREE.DirectionalLight('white', 3);
    light.position.set(1, 2, 3);
    scene.add(light);

    renderer.render(scene, camera);
`;

export default {
  id: '03-three',
  number: '3',
  title: 'Three.js で箱を1つ出す',
  summary: '部品の読みこみ、空間・カメラ・描く係、形と材質、光',
  start: '',
  checked: '2026-11-20',
  sources: [
    { label: 'MDN：JavaScript モジュール', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules' },
    { label: 'MDN：インポートマップ', url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/script/type/importmap' },
    { label: 'three.js：Scene', url: 'https://threejs.org/docs/pages/Scene.html' },
    { label: 'three.js：Object3D（position と rotation）', url: 'https://threejs.org/docs/pages/Object3D.html' },
    { label: 'three.js：Euler（回転の角度）', url: 'https://threejs.org/docs/pages/Euler.html' },
    { label: 'MDN：Window.innerWidth', url: 'https://developer.mozilla.org/ja/docs/Web/API/Window/innerWidth' },
    { label: 'MDN：Window.innerHeight', url: 'https://developer.mozilla.org/ja/docs/Web/API/Window/innerHeight' },
    { label: 'three.js：Camera（向き）', url: 'https://threejs.org/docs/pages/Camera.html' },
    { label: 'three.js：Vector3（位置の初期値）', url: 'https://threejs.org/docs/pages/Vector3.html' },
    { label: 'three.js：Color（色の名前）', url: 'https://threejs.org/docs/pages/Color.html' },
    { label: 'three.js：PerspectiveCamera', url: 'https://threejs.org/docs/pages/PerspectiveCamera.html' },
    { label: 'three.js：WebGLRenderer', url: 'https://threejs.org/docs/pages/WebGLRenderer.html' },
    { label: 'three.js：BoxGeometry', url: 'https://threejs.org/docs/pages/BoxGeometry.html' },
    { label: 'three.js：Mesh', url: 'https://threejs.org/docs/pages/Mesh.html' },
    { label: 'three.js：MeshNormalMaterial', url: 'https://threejs.org/docs/pages/MeshNormalMaterial.html' },
    { label: 'three.js：MeshStandardMaterial', url: 'https://threejs.org/docs/pages/MeshStandardMaterial.html' },
    { label: 'three.js：DirectionalLight', url: 'https://threejs.org/docs/pages/DirectionalLight.html' },
    { label: 'three.js のパッケージ（jsDelivr、0.187.0）', url: 'https://www.jsdelivr.com/package/npm/three?version=0.187.0' },
    { label: 'three.js 0.187.0 のソース（REVISION の定義）', url: 'https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.core.js' },
  ],
  steps: [
    {
      title: 'Three.js を読みこむ',
      body: `
<p>Three.js は、ほかの人が書いた JavaScript の部品です。ここでは、部品を配っているサイト（CDN）から読みこみます。</p>
<ul>
  <li><code>&lt;script type="module"&gt;</code> の中では、<code>import</code> で別のファイルの部品を読みこめます。</li>
  <li><code>&lt;script type="importmap"&gt;</code> は、<code>'three'</code> という短い名前が、どの URL を指すかを決める表です。これがあるので、<code>import ... from 'three'</code> と短く書けます。</li>
  <li><code>import * as THREE</code> は、部品のすべてを <code>THREE</code> という名前でまとめて使えるようにします。</li>
  <li>読みこめたかを確かめるため、版の番号 <code>THREE.REVISION</code> を左上に出しています。</li>
</ul>`,
      code: HEAD + TAIL,
      care: `
<p>URL の <code>three@0.187.0</code> のように、版を決めて書いています。この練習の見本は、この版で動かして確かめています。</p>
<p>importmap の URL は長くて打ちにくいので、この行だけはコピーして貼ってもかまいません。</p>`,
      try: `<p>実行結果の左上に <code>three.js r187</code> と出れば、読みこめています。URL の版を、存在しない <code>0.187.9</code> に変えて実行すると、読みこみに失敗して何も出なくなります（このページの見本で動かして確認。確かめたら戻そう）。</p>`,
    },
    {
      title: '空間とカメラと描く係',
      body: `
<p>3D を画面に出すには、3つの役がそろう必要があります。</p>
<ul>
  <li><b>Scene（空間）</b>：物を置く入れ物です。</li>
  <li><b>PerspectiveCamera（カメラ）</b>：空間をどこから、どの広さで見るかを決めます。引数は順に、縦の視野の角度（度）、画面の横の幅を縦の高さで割った比、これより近くは映さない距離、これより遠くは映さない距離です。</li>
  <li><b>WebGLRenderer（描く係）</b>：カメラから見た空間を、絵にして画面に出します。<code>renderer.domElement</code> が、その絵を描く <code>&lt;canvas&gt;</code> 要素です。これをページに足しています。</li>
</ul>
<p>物の位置は、何も指定しないと原点 (0, 0, 0) です。カメラは、何も指定しないと z の小さくなる向き（奥）を見ています。そこで <code>camera.position.z = 3</code> でカメラを手前に3だけ下げて、原点に置いた箱が見えるようにしています。</p>
<p>そのうえで、箱を作って空間に置き、<code>renderer.render(scene, camera)</code> で1回描きます。</p>
<ul>
  <li><b>BoxGeometry</b>：箱の形です。引数は幅・高さ・奥行きです。</li>
  <li><b>MeshNormalMaterial</b>：面の向きに応じて色をつける材質です。この歩の見本には光がありませんが、箱は色つきで見えます（このページの見本で動かして確認）。</li>
  <li><b>Mesh</b>：形と材質を組にした、画面に映る物です。</li>
  <li><code>rotation</code> で少し傾けて、箱の3つの面が見えるようにしています。角度の単位は度ではなくラジアンです。</li>
</ul>`,
      code: HEAD + SETUP + BOX_NORMAL + TAIL,
      care: `
<p><code>innerWidth</code> と <code>innerHeight</code> は、いまの表示領域の幅と高さです。このページでは、実行結果の枠の大きさになります。</p>
<p><code>scene.add(box)</code> を忘れると、箱を作っても空間に置かれないので、何も映りません。</p>`,
      try: `<p><code>camera.position.z</code> を <code>3</code> から <code>6</code> に変えると、カメラが遠ざかって箱が小さく見えます（確かめたら戻そう）。</p>`,
    },
    {
      title: '光を当てる',
      body: `
<p>材質を <b>MeshStandardMaterial</b> に変えます。光の当たり方で明るさが変わる材質です。色は <code>tomato</code> にしました。</p>
<p>光を当てるため、<b>DirectionalLight</b> を足します。太陽の光のように、一方向から平行に当たる光です。引数は光の色と強さです。<code>light.position</code> は、光がどちらから来るかを決めます。</p>
<p>面ごとに明るさが違って見えれば、光が当たっています。</p>`,
      code: HEAD + SETUP + BOX_LIT + TAIL,
      care: `
<p>この見本から光の行を消すと、箱は真っ黒になり、黒い背景にまぎれて見えなくなります（このページの見本で動かして確認）。「何も映らない」ときは、光と <code>scene.add</code> を最初に疑いましょう。</p>`,
      try: `<p><code>light.position.set(1, 2, 3)</code> を <code>(-1, 2, 3)</code> に変えると、光が反対の横から当たります。明るい面が変わるのを見てみよう（確かめたら戻そう）。</p>`,
    },
  ],
};
