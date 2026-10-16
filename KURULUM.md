# Vird Android: kurulum

Bir kez yapılır, bilgisayardan yaklaşık 20 dakika. Sonrasında güncellemeler otomatik derlenir.

## 1. Firebase (veritabanı, 10 dk)

1. **console.firebase.google.com** → **Proje oluştur** → ad: `vird-aile` → Google Analytics'i **kapat** → Oluştur.
2. Sol menü **Derleme → Authentication** → **Başlayın** → **Oturum açma yöntemi** → **Anonim** → Etkinleştir → Kaydet.
   (Kullanıcılar hiçbir şey girmez; bu sadece telefonları ayırt etmek için.)
3. Sol menü **Derleme → Firestore Database** → **Veritabanı oluştur**
   - Konum: **eur3 (Europe)**
   - **Üretim modunda başlat** → Oluştur
   - Üstte **Kurallar** sekmesi → içindekileri sil → `firestore.rules` dosyasının içeriğini yapıştır → **Yayınla**.
4. Sol üstte dişli → **Proje ayarları** → aşağıda **Uygulamalarınız** → **Web** simgesi (`</>`)
   - Takma ad: `Vird` → **Uygulamayı kaydet**
   - Çıkan `firebaseConfig` içindeki değerleri (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`) kopyala.
5. `www/js/firebase-config.js` dosyasını Not Defteri ile aç, tırnakların içine bu değerleri yapıştır, kaydet.

## 2. GitHub (APK derleme, 10 dk)

1. **github.com** → hesap aç / giriş yap → sağ üstte **+ → New repository**
   - Repository name: `vird`
   - **Public** → **Create repository**
2. Açılan sayfada **uploading an existing file** bağlantısına bas.
3. Bu klasörün **içindeki her şeyi** (klasörlerle birlikte) sürükleyip bırak → **Commit changes**.
   - `.github` klasörü gizli görünebilir. Windows'ta Görünüm → **Gizli öğeler**'i aç ve onu da sürükle.
   - Yine de yüklenmezse: repo'da **Actions → set up a workflow yourself** → `.github/workflows/android.yml` içeriğini yapıştır → Commit.
4. **Settings → Pages** → Branch: `main`, klasör: `/docs` → **Save**. (Davet sayfası için.)
5. **Actions** sekmesinde "Android APK" çalışmaya başlar, 5–8 dakika sürer. Yeşil tik çıkınca APK hazır.

## 3. Telefonlara kur

1. Telefonda şu adresi aç (KULLANICI yerine GitHub kullanıcı adın):
   `https://github.com/KULLANICI/vird/releases/latest/download/vird.apk`
2. İndir → aç → **Yükle**. Telefon "bilinmeyen kaynak" izni isterse ver.
3. Vird'i aç → adını yaz → **Başla** → bildirim iznine **İzin ver**.
4. **Ayarlar → Davet linki gönder** → WhatsApp'tan eşine gönder.
5. Eşin linke dokunur: sayfada önce **İndir**, kurulunca **Vird'de aç** → "Sen kimsin?" → adını ekler. Bitti.

## Güncellemeler

- Sana yeni dosyalar verdiğimde GitHub'da **Add file → Upload files** ile aynı adlarla yükle → Commit.
- APK otomatik yeniden derlenir. Uygulama açılınca üstte **"Yeni sürüm hazır"** çıkar → **İndir ve kur**. Eskisinin üstüne kurulur, veriler korunur.

## Bilmen gerekenler

- **Bildirimler** telefonun kendisi tarafından zamanlanır, internetsiz de gelir. Saatleri herkes kendi telefonunda **Ayarlar → Bildirimler**'den değiştirir.
- **Telefon değişirse** ya da uygulama silinip kurulursa: aileden biri yeni davet linki gönderir, linke dokunup listeden kendi adını seçersin. Kayıtların yerinde.
- **Verilerimi sil** (Ayarlar'da) senin kayıtlarını ve telefonun aile bağlantısını kalıcı olarak siler.
- `keystore/vird-test.jks` sadece deneme sürümü içindir. Play Store'a geçerken yeni ve gizli bir imza anahtarı oluşturacağız.
