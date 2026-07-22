export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Anamur' | 'Bozyazı' | 'Bakım Rehberi';
  publishedAt: string; // YYYY-MM-DD
  readingMinutes: number;
  sections: BlogSection[];
  faq: BlogFAQ[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'anamurda-dogru-berberi-nasil-secersiniz',
    title: "Anamur'da Doğru Berberi Nasıl Seçersiniz?",
    excerpt:
      "Anamur gibi sahil kasabalarında güvenilir bir berber seçerken hijyen, uzmanlık ve randevu sisteminde nelere dikkat etmelisiniz?",
    category: 'Anamur',
    publishedAt: '2026-06-02',
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          'Anamur, Mersin\'in en uzun kıyı şeridine sahip ilçelerinden biri ve yaz aylarında hem yerli hem turist yoğunluğu yaşayan bir merkez. Bu da berber ve kuaför hizmetlerine olan talebi artırıyor. Peki doğru berberi seçerken nelere dikkat etmek gerekir?',
        ],
      },
      {
        heading: 'Hijyen ve Sterilizasyon',
        paragraphs: [
          'Ustura, makas ve tarak gibi ekipmanların her müşteri sonrası dezenfekte edilmesi olmazsa olmaz bir kriterdir. Salonun genel temizliği de tercih sırasında göz önünde bulundurulmalı.',
        ],
      },
      {
        heading: 'Uzmanlık Alanı',
        paragraphs: [
          'Her berberin güçlü olduğu bir alan vardır: kimi klasik ustura tıraşında, kimi modern saç şekillendirmede daha deneyimlidir. İlk ziyaretinizde ihtiyacınızı net anlatmanız en iyi sonucu almanızı sağlar.',
        ],
      },
      {
        heading: 'Randevu Sisteminin Avantajı',
        paragraphs: [
          'Özellikle yaz sezonunda Anamur\'da berber salonları yoğunlaşabilir. Online randevu sistemi kullanan salonlar, bekleme süresini ortadan kaldırarak zamanınızı planlamanızı kolaylaştırır.',
        ],
        list: [
          'Uygun saat dilimini önceden görebilirsiniz',
          'Salon önünde beklemezsiniz',
          'Hizmet ve fiyat bilgisine randevu öncesi ulaşırsınız',
        ],
      },
      {
        heading: 'Fiyat Şeffaflığı',
        paragraphs: [
          'Güvenilir bir salon, hizmet fiyatlarını randevu almadan önce açıkça paylaşır. Sürpriz ücretlendirme yerine net bir fiyat listesi görmek, müşteri memnuniyeti açısından önemlidir.',
        ],
      },
    ],
    faq: [
      {
        question: "Anamur'da berbere randevusuz gidilebilir mi?",
        answer:
          'Çoğu salon randevusuz müşteriyi de kabul eder, ancak özellikle yaz sezonunda bekleme süresi uzayabilir. Online randevu, belirli bir saatte hizmet almanızı garanti eder.',
      },
      {
        question: 'Yeni bir berbere ilk ziyarette neye dikkat etmeliyim?',
        answer:
          'Salonun hijyen koşullarını gözlemleyin, önceki müşteri yorumlarına bakın ve istediğiniz stili net bir şekilde ifade edin.',
      },
      {
        question: 'Fiyatlar neye göre değişir?',
        answer:
          'Saç/sakal uzunluğu, işlem süresi ve seçilen hizmet türüne (kesim, ustura tıraşı, bakım) göre fiyat değişebilir. Güncel fiyat listesi için Fiyatlar sayfamıza bakabilirsiniz.',
      },
    ],
  },
  {
    slug: 'mamure-kalesi-yakininda-berber-anamur-merkez-rehberi',
    title: 'Mamure Kalesi Yakınında Berber Hizmetleri — Anamur Merkez Rehberi',
    excerpt:
      "Anamur'un simgesi Mamure Kalesi ve antik Anamurium kenti çevresinde gezerken merkezde berber hizmeti almak isteyenler için pratik rehber.",
    category: 'Anamur',
    publishedAt: '2026-06-10',
    readingMinutes: 3,
    sections: [
      {
        paragraphs: [
          "Anamur denince akla ilk gelen yerlerden biri, Anadolu'nun en iyi korunmuş ortaçağ kalelerinden sayılan Mamure Kalesi'dir. Kaleye birkaç kilometre mesafedeki antik Anamurium kenti de bölgeyi ziyaret edenlerin uğrak noktalarından.",
        ],
      },
      {
        heading: 'Merkezde Bakım İhtiyacı',
        paragraphs: [
          'Gerek bölge sakinleri gerekse tatil için Anamur\'a gelenler, gezi programına bir berber randevusu eklemek isteyebilir. Anamur merkezde hizmet veren salonumuz, saç kesimi, sakal tıraşı ve cilt bakımı gibi hizmetleri online randevu ile sunuyor.',
        ],
      },
      {
        heading: 'Neden Önceden Randevu?',
        paragraphs: [
          'Özellikle Nisan-Ekim arası turizm sezonunda Anamur merkezde hizmet talebi artıyor. Kale veya sahil gezisi öncesi ya da sonrası için saatinizi önceden ayırtmak, günün geri kalanını rahatça planlamanızı sağlar.',
        ],
      },
    ],
    faq: [
      {
        question: 'Salon Anamur merkezde mi?',
        answer:
          'Evet, salonumuz Anamur merkezde hizmet vermektedir. Açık adres bilgisi güncellendiğinde İletişim sayfamızda paylaşılacaktır.',
      },
      {
        question: 'Turizm sezonunda randevu almak zor mu?',
        answer:
          'Yaz aylarında talep arttığı için önceden online randevu almanızı öneririz.',
      },
    ],
  },
  {
    slug: 'yaz-sezonunda-bozyazi-sahillerinde-sac-sakal-bakimi',
    title: 'Yaz Sezonunda Bozyazı Sahillerinde Saç ve Sakal Bakımı Önerileri',
    excerpt:
      "Tekeli ve Tekmen sahilleriyle bilinen Bozyazı'da yaz tatilinde saç ve sakalınızı tuzlu suya ve güneşe karşı nasıl korursunuz?",
    category: 'Bozyazı',
    publishedAt: '2026-06-18',
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Mersin'in Akdeniz kıyısındaki ilçelerinden Bozyazı, özellikle Tekeli ve Tekmen sahilleriyle yaz aylarında yoğun ziyaretçi ağırlıyor. Deniz tatili sırasında saç ve sakal bakımı genelde ihmal edilen bir konu olsa da, tuzlu su ve güneş bu bölgelerde ciddi hasara yol açabilir.",
        ],
      },
      {
        heading: 'Tuzlu Suyun Etkisi',
        paragraphs: [
          'Deniz suyundaki tuz, saç tellerinin nem dengesini bozarak kuruluğa ve kırılmaya neden olabilir. Sakalda ise ciltte tahriş ve kaşıntı riski artar.',
        ],
        list: [
          'Denize girmeden önce saça hafif bir yağ veya serum uygulamak koruyucu bir bariyer oluşturur',
          'Denizden çıktıktan sonra tatlı suyla durulamak tuz birikimini önler',
          'Sakal bölgesine sonrasında nemlendirici sakal yağı sürmek cildi rahatlatır',
        ],
      },
      {
        heading: 'Güneşten Korunma',
        paragraphs: [
          'Saç derisi de güneş yanığından etkilenebilir, özellikle seyrek saçlı bölgelerde şapka kullanımı önerilir. Sakal için ise SPF içeren ürünler tercih edilebilir.',
        ],
      },
      {
        heading: 'Tatil Sonrası Düzenli Bakım',
        paragraphs: [
          "Yaz tatili sonrası saç ve sakalın toparlanması için profesyonel bir kesim ve bakım seansı faydalı olur. Bozyazı'dan Anamur merkezdeki salonumuza kolayca ulaşarak randevu alabilirsiniz.",
        ],
      },
    ],
    faq: [
      {
        question: 'Tuzlu su gerçekten saça zarar verir mi?',
        answer:
          'Evet, tuz saçın doğal nem dengesini bozarak kuruluk ve kırılganlığa yol açabilir. Denizden sonra durulamak bu etkiyi azaltır.',
      },
      {
        question: 'Yaz aylarında ne sıklıkla saç kesimi yaptırmalıyım?',
        answer:
          'Yaz aylarında uç kırılmalarını önlemek için 3-4 haftada bir uç alımı önerilir, ancak bu saç yapınıza göre değişebilir.',
      },
    ],
  },
  {
    slug: 'bozyazidan-anamura-randevu-mesafe-ulasim-rehberi',
    title: "Bozyazı'dan Anamur'a Randevu: Mesafe ve Ulaşım Rehberi",
    excerpt:
      "Bozyazı'da yaşayanlar veya tatilde olanlar için Anamur merkezdeki salonumuza ulaşım süresi ve online randevu ile planlama rehberi.",
    category: 'Bozyazı',
    publishedAt: '2026-06-25',
    readingMinutes: 3,
    sections: [
      {
        paragraphs: [
          'Salonumuz Anamur merkezde hizmet vermektedir; ikinci bir şubemiz bulunmamaktadır. Ancak Bozyazı\'dan gelen müşterilerimizi de memnuniyetle ağırlıyoruz — iki ilçe arası mesafe oldukça kısa.',
        ],
      },
      {
        heading: 'Mesafe ve Süre',
        paragraphs: [
          'Bozyazı ile Anamur merkez arası kara yoluyla yaklaşık 15 kilometre olup özel araçla ortalama 14 dakika sürmektedir. Sahil yolu güzergahı, yolculuğu keyifli hale getirir.',
        ],
      },
      {
        heading: 'Randevunuzu Önceden Planlayın',
        paragraphs: [
          'Bozyazı\'dan yola çıkmadan önce online randevu sistemimizle uygun saati seçebilir, salona vardığınızda beklemeden hizmet alabilirsiniz. Bu özellikle tatil dönemlerinde zaman kazandırır.',
        ],
      },
    ],
    faq: [
      {
        question: "Bozyazı'dan Anamur'a ulaşım ne kadar sürer?",
        answer: 'Özel araçla yaklaşık 14 dakika, toplu taşıma ile bu süre değişkenlik gösterebilir.',
      },
      {
        question: "Bozyazı'da şubeniz var mı?",
        answer:
          "Hayır, tek salonumuz Anamur merkezdedir. Bozyazı'dan gelen müşterilerimiz için online randevu almanızı öneririz.",
      },
    ],
  },
  {
    slug: 'yaz-aylarinda-tuzlu-su-gunesten-sac-sakal-koruma-rehberi',
    title: 'Erkeklerde Yaz Aylarında Tuzlu Su ve Güneşten Saç-Sakal Koruma Rehberi',
    excerpt:
      'Akdeniz kıyısında geçirdiğiniz yaz günlerinde saç ve sakalınızı güneş ile tuzlu suya karşı korumak için pratik öneriler.',
    category: 'Bakım Rehberi',
    publishedAt: '2026-07-02',
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Anamur ve Bozyazı gibi Akdeniz kıyısı ilçelerde yaz ayları uzun ve güneşli geçiyor. Bu durum cilt bakımı kadar saç ve sakal sağlığını da doğrudan etkiliyor.",
        ],
      },
      {
        heading: 'Saç Derisi İçin Güneş Koruması',
        paragraphs: [
          'Saç derisi genelde ihmal edilen bir bölgedir, oysa güneş yanığı burada da oluşabilir. Uzun süre güneş altında kalınacaksa şapka veya bandana kullanımı önerilir.',
        ],
      },
      {
        heading: 'Sakal Bakımı',
        paragraphs: [
          'Güneş, sakal kıllarını kurutabilir ve cildi tahriş edebilir. Gün içinde hafif bir sakal yağı kullanmak hem parlaklık kazandırır hem de cildi besler.',
        ],
      },
      {
        heading: 'Pratik Öneriler',
        list: [
          'Denize girmeden önce ve sonra bol su için',
          'Haftada en az bir kez nemlendirici saç/sakal bakımı uygulayın',
          'Düzenli aralıklarla profesyonel kesim ile yıpranmış uçları aldırın',
        ],
      },
    ],
    faq: [
      {
        question: 'Yaz aylarında saç dökülmesi artar mı?',
        answer:
          'Güneş ve tuzlu suyun kurutucu etkisi, zaten zayıf olan tellerde kırılma ve dökülme hissini artırabilir. Düzenli bakım bu etkiyi azaltır.',
      },
      {
        question: 'Sakal yağı her gün kullanılabilir mi?',
        answer:
          'Evet, çoğu sakal yağı günlük kullanıma uygundur; cilt tipinize göre miktarı ayarlamanız yeterlidir.',
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
