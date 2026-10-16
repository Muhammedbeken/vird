/* Vird: sabit veriler */
const ESMA=[["Allah","الله",66],["Er-Rahmân","الرحمن",298],["Er-Rahîm","الرحيم",258],["El-Melik","الملك",90],["El-Kuddûs","القدوس",170],["Es-Selâm","السلام",131],["El-Mü'min","المؤمن",136],["El-Müheymin","المهيمن",145],["El-Azîz","العزيز",94],["El-Cebbâr","الجبار",206],["El-Mütekebbir","المتكبر",662],["El-Hâlık","الخالق",731],["El-Bâri","البارئ",213],["El-Musavvir","المصور",336],["El-Gaffâr","الغفار",1281],["El-Kahhâr","القهار",306],["El-Vehhâb","الوهاب",14],["Er-Rezzâk","الرزاق",308],["El-Fettâh","الفتاح",489],["El-Alîm","العليم",150],["El-Kâbıd","القابض",903],["El-Bâsıt","الباسط",72],["El-Hâfıd","الخافض",1481],["Er-Râfi","الرافع",351],["El-Muizz","المعز",117],["El-Müzil","المذل",770],["Es-Semî","السميع",180],["El-Basîr","البصير",302],["El-Hakem","الحكم",68],["El-Adl","العدل",104],["El-Latîf","اللطيف",129],["El-Habîr","الخبير",812],["El-Halîm","الحليم",88],["El-Azîm","العظيم",1020],["El-Gafûr","الغفور",1286],["Eş-Şekûr","الشكور",526],["El-Aliyy","العلي",110],["El-Kebîr","الكبير",232],["El-Hafîz","الحفيظ",998],["El-Mukît","المقيت",550],["El-Hasîb","الحسيب",80],["El-Celîl","الجليل",73],["El-Kerîm","الكريم",270],["Er-Rakîb","الرقيب",312],["El-Mucîb","المجيب",55],["El-Vâsi","الواسع",137],["El-Hakîm","الحكيم",78],["El-Vedûd","الودود",20],["El-Mecîd","المجيد",57],["El-Bâis","الباعث",573],["Eş-Şehîd","الشهيد",319],["El-Hakk","الحق",108],["El-Vekîl","الوكيل",66],["El-Kaviyy","القوي",116],["El-Metîn","المتين",500],["El-Veliyy","الولي",46],["El-Hamîd","الحميد",62],["El-Muhsî","المحصي",148],["El-Mübdi","المبدئ",56],["El-Muîd","المعيد",124],["El-Muhyî","المحيي",68],["El-Mümît","المميت",490],["El-Hayy","الحي",18],["El-Kayyûm","القيوم",156],["El-Vâcid","الواجد",14],["El-Mâcid","الماجد",48],["El-Vâhid","الواحد",19],["Es-Samed","الصمد",134],["El-Kâdir","القادر",305],["El-Muktedir","المقتدر",744],["El-Mukaddim","المقدم",184],["El-Muahhir","المؤخر",846],["El-Evvel","الأول",37],["El-Âhir","الآخر",801],["Ez-Zâhir","الظاهر",1106],["El-Bâtın","الباطن",62],["El-Vâlî","الوالي",47],["El-Müteâlî","المتعالي",551],["El-Berr","البر",202],["Et-Tevvâb","التواب",409],["El-Müntakim","المنتقم",630],["El-Afüvv","العفو",156],["Er-Raûf","الرؤوف",286],["Mâlikü'l-Mülk","مالك الملك",212],["Zü'l-Celâli ve'l-İkrâm","ذو الجلال والإكرام",1100],["El-Muksit","المقسط",209],["El-Câmi","الجامع",114],["El-Ganiyy","الغني",1060],["El-Muğnî","المغني",1100],["El-Mâni","المانع",161],["Ed-Dârr","الضار",1001],["En-Nâfi","النافع",201],["En-Nûr","النور",256],["El-Hâdî","الهادي",20],["El-Bedî","البديع",86],["El-Bâkî","الباقي",113],["El-Vâris","الوارث",707],["Er-Reşîd","الرشيد",514],["Es-Sabûr","الصبور",298]];

const CATMAP={istigfar:'zikir',hamdele:'zikir',salavat:'zikir',esma:'zikir',tefekkur:'zikir',kuran_ortak:'kuran',kuran:'kuran',tefsir:'kuran',ezber:'kuran',hadis:'ilim',arapca:'ilim',aile_dersi:'ilim',derse_gitmek:'ilim',online_ders:'ilim',ders_serisi:'ilim',kitap:'ilim',kusluk:'ibadet',teheccud:'ibadet',oruc:'ibadet',cami:'ibadet',sadaka:'hayir',zekat:'hayir',fidan:'hayir',yetim:'hayir',spor:'saglik'};
const DEFAULT_TASKS=[
  {id:'istigfar',name:'İstiğfar',period:'d',target:100,unit:'adet',scope:'kisi',ar:'أستغفر الله'},
  {id:'hamdele',name:'Hamdele',period:'d',target:100,unit:'adet',scope:'kisi',ar:'الحمد لله'},
  {id:'salavat',name:'Salavat',period:'d',target:100,unit:'adet',scope:'kisi',ar:'اللهم صل على محمد'},
  {id:'esma',name:'Günün Esmaları',period:'d',target:3,unit:'esma',scope:'kisi'},
  {id:'tefekkur',name:'Tefekkür',period:'d',target:10,unit:'dk',scope:'kisi'},
  {id:'kuran_ortak',name:"Ortak Kur'an",period:'d',target:2,unit:'sayfa',scope:'aile'},
  {id:'kuran',name:"Bireysel Kur'an",period:'d',target:4,unit:'sayfa',scope:'kisi'},
  {id:'tefsir',name:'Tefsir',period:'d',target:1,unit:'bölüm',scope:'kisi'},
  {id:'ezber',name:'Ezber',period:'d',target:15,unit:'dk',scope:'kisi'},
  {id:'hadis',name:'Hadis',period:'d',target:1,unit:'bölüm',scope:'kisi'},
  {id:'arapca',name:'Arapça ders',period:'d',target:1,unit:'ders',scope:'kisi'},
  {id:'aile_dersi',name:'Aile dersi',period:'w',target:1,unit:'ders',scope:'aile'},
  {id:'derse_gitmek',name:'Derse gitmek',period:'w',target:1,unit:'kez',scope:'kisi'},
  {id:'online_ders',name:'Online ders dinlemek',period:'w',target:1,unit:'ders',scope:'kisi'},
  {id:'ders_serisi',name:'Ders serisi',period:'w',target:1,unit:'ders',scope:'kisi'},
  {id:'kitap',name:'Kitap okuma',period:'w',target:120,unit:'dk',scope:'kisi'},
  {id:'kusluk',name:'Kuşluk namazı',period:'w',target:3,unit:'kez',scope:'kisi'},
  {id:'teheccud',name:'Teheccüd',period:'w',target:1,unit:'kez',scope:'kisi'},
  {id:'oruc',name:'Oruç',period:'w',target:1,unit:'gün',scope:'kisi'},
  {id:'sadaka',name:'Sadaka',period:'w',target:1,unit:'kez',scope:'kisi'},
  {id:'spor',name:'Spor',period:'w',target:2,unit:'kez',scope:'kisi'},
  {id:'cami',name:'Cami ziyareti',period:'m',target:2,unit:'kez',scope:'kisi'},
  {id:'zekat',name:'Zekât',period:'m',target:1,unit:'kez',scope:'aile'},
  {id:'fidan',name:'Fidan bağışı',period:'m',target:1,unit:'kez',scope:'aile'},
  {id:'yetim',name:'Yetim hamiliği',period:'m',target:1,unit:'kez',scope:'aile'}
].map(t=>Object.assign(t,{cat:CATMAP[t.id]||'diger'}));
