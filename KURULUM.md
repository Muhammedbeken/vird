# Vird Android: kurulum ve güncelleme

## İlk kurulum (bir kez, bilgisayardan)

### 1. Firebase
1. **console.firebase.google.com** → projeni aç (`vird-aile-b4a3d`).
2. **Authentication → Oturum açma yöntemi → Anonim**: etkin olmalı.
3. **Firestore Database → Kurallar**: içindekileri sil, `firestore.rules` dosyasının içeriğini yapıştır → **Yayınla**.
   Kurallar dosyası her değiştiğinde bu adımı tekrarla.
4. Firebase ayarları `www/js/firebase-config.js` dosyasında zaten hazır.

### 2. GitHub
1. `vird` reposuna bu klasördeki her şeyi yükle (Add file → Upload files).
   `.github/workflows/android.yml` repoda olmalı; yoksa Actions → New workflow → set up a workflow yourself ile oluştur.
2. **Settings → Pages** → Branch `main`, klasör `/docs` → Save (davet sayfası).
3. **Actions** sekmesinde "Android APK" yeşil tik alınca APK hazırdır.

### 3. Telefon
1. `https://github.com/KULLANICI/vird/releases/latest/download/vird.apk` adresini telefonda aç, indir, kur.
2. Vird'i aç → adını yaz → **Başla** → bildirim iznine izin ver.
3. **Gruplar** sekmesi → grup oluştur (Aile, Arkadaşlar ya da özel ad) → **Davet linki gönder**.
4. Davet edilen kişi linke dokunur → uygulamayı indirir → **Vird'de aç** → adını yazıp katılır.
5. **Ayarlar → Namaz vakitleri**: il/ilçe seç ya da konumunu kullan; vakitlerden kaç dakika önce bildirim geleceğini seç.

## Güncelleme
1. Kurallar dosyası değiştiyse önce Firebase'de **Yayınla** (yukarıda 1.3).
2. Değişen dosyaları GitHub'da aynı klasörlerine yükle → Commit.
3. APK otomatik derlenir; uygulamada **"Yeni sürüm hazır"** çıkar → indir, eskisinin üstüne kur. Veriler korunur.

## Bilmen gerekenler
- **Gruplar:** İstediğin kadar grubun olabilir. Kişisel görevlerin tek listedir ve bütün gruplarında aynı kalır; her grubun ayrıca kendi ortak görevleri vardır.
- **Telefon değişirse:** Gruptan biri yeni davet linki gönderir; linke dokunup listeden kendi adını seçersin, kayıtların geri gelir.
- **Bildirimler** telefonun kendisi tarafından zamanlanır. Namaz vakti ve oruç hatırlatmaları önümüzdeki 14 gün için kurulur ve uygulama her açıldığında yenilenir; uygulamayı iki haftadan uzun açmazsan bu hatırlatmalar durur.
- **Namaz vakitleri:** İl/ilçe seçiminde vakitler Diyanet İşleri Başkanlığı'nın yayımladığı vakitlerden gelir (açık bir aracı servis üzerinden). Konum seçeneğinde vakitler hesaplamayla bulunur ve birkaç dakika farklı olabilir.
- **Günün âyeti:** Diyanet İşleri Başkanlığı meali, açık bir Kur'an servisi (AlQuran Cloud) üzerinden gelir.
- **Günün hadisi:** Uygulamaya eklenmiş, kaynakları belirtilmiş tanınmış hadislerden seçilir; metinler kısa ve sadeleştirilmiş meal şeklindedir.
- **Verilerimi sil** (Ayarlar): kayıtlarını, grup üyeliklerini ve telefonun bağlantısını kalıcı olarak siler.
- `keystore/vird-test.jks` sadece deneme sürümü içindir; Play Store'a geçerken yeni ve gizli bir imza anahtarı oluşturulacak.
