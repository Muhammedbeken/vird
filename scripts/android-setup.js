// Vird: "npx cap add android" sonrasında Android projesini özelleştirir.
// GitHub Actions bunu otomatik çalıştırır; elle çalıştırman gerekmez.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const app = path.join(root, 'android', 'app');
const res = path.join(app, 'src', 'main', 'res');

function copyDir(src, dst) {
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyDir(s, d); }
    else fs.copyFileSync(s, d);
  }
}

// 1) Simgeler, açılış ekranı, bildirim simgesi
copyDir(path.join(root, 'resources', 'android', 'res'), res);

// 2) Davet linkleri: vird://davet?t=...
const manPath = path.join(app, 'src', 'main', 'AndroidManifest.xml');
let man = fs.readFileSync(manPath, 'utf8');
if (!man.includes('android:scheme="vird"')) {
  man = man.replace(
    /(<category android:name="android.intent.category.LAUNCHER" \/>\s*<\/intent-filter>)/,
    `$1

            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="vird" android:host="davet" />
            </intent-filter>`
  );
  if (!man.includes('android:scheme="vird"')) throw new Error('AndroidManifest güncellenemedi');
  fs.writeFileSync(manPath, man);
}

// 2b) Namaz vakitleri için yaklaşık konum izni
man = fs.readFileSync(manPath, 'utf8');
if (!man.includes('ACCESS_COARSE_LOCATION')) {
  man = man.replace('<uses-permission android:name="android.permission.INTERNET" />',
    '<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />\n    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />');
  if (!man.includes('ACCESS_COARSE_LOCATION')) throw new Error('Konum izni eklenemedi');
  fs.writeFileSync(manPath, man);
}

// 3) İmza ve sürüm numarası
const run = parseInt(process.env.GITHUB_RUN_NUMBER || '1', 10);
const gPath = path.join(app, 'build.gradle');
let g = fs.readFileSync(gPath, 'utf8');
g = g.replace(/versionCode \d+/, `versionCode ${run}`).replace(/versionName "[^"]*"/, `versionName "1.0.${run}"`);
if (!g.includes('signingConfigs')) {
  g = g.replace(/(\n\s*buildTypes \{)/, `
    signingConfigs {
        vird {
            storeFile file("../../keystore/vird-test.jks")
            storePassword "virdtest123"
            keyAlias "vird"
            keyPassword "virdtest123"
        }
    }$1`);
  g = g.replace(/(release \{\s*\n)/, `$1            signingConfig signingConfigs.vird\n`);
  if (!g.includes('signingConfig signingConfigs.vird')) throw new Error('build.gradle güncellenemedi');
}
fs.writeFileSync(gPath, g);

// 4) Uygulamanın kendi sürümünü ve deposunu bilmesi (güncelleme kontrolü, davet linki)
const repo = process.env.GITHUB_REPOSITORY || '';
fs.writeFileSync(path.join(root, 'www', 'js', 'build.js'),
  `window.VIRD_BUILD=${run};window.VIRD_REPO=${JSON.stringify(repo)};\n`);

console.log('Vird Android ayarları tamam. Sürüm 1.0.' + run + (repo ? ' / ' + repo : ''));
