import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Landmark, Waves, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { DEFAULT_SERVICES, SITE_NAME } from '@/lib/constants';
import { getFAQSchema, getLocalBusinessSchema } from '@/app/schema';
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Anamur Berber — Anamur Merkez Erkek Kuaförü',
  description: `${SITE_NAME}, Anamur merkezde saç kesimi, sakal tıraşı ve cilt bakımı hizmetleri sunan premium erkek kuaförüdür. Online randevu alın.`,
};

const facts = [
  {
    icon: MapPin,
    title: 'Anamur Merkez',
    text: "Salonumuz Anamur merkezde hizmet vermektedir. Mersin'in en uzun kıyı şeridine sahip ilçelerinden biri olan Anamur, hem yerleşiklere hem tatilcilere ev sahipliği yapar.",
  },
  {
    icon: Landmark,
    title: 'Mamure Kalesi & Anamurium',
    text: "Anadolu'nun en iyi korunmuş kalelerinden Mamure Kalesi ve antik Anamurium kenti, Anamur'u ziyaret edenlerin uğrak noktalarındandır.",
  },
  {
    icon: Waves,
    title: '60 km Sahil Şeridi',
    text: "Anamur, Bozyazı sınırından Anıtlı'ya (Kaledran) kadar uzanan yaklaşık 60 kilometrelik sahil şeridiyle bilinir.",
  },
];

const faqItems = [
  {
    question: 'Anamur merkezde randevu almak zor mu?',
    answer:
      "Online randevu sistemimiz sayesinde uygun saati seçip anında randevu oluşturabilirsiniz, özellikle yaz sezonunda önceden randevu almanızı öneririz.",
  },
  {
    question: 'Hangi hizmetleri sunuyorsunuz?',
    answer:
      'Saç kesimi, sakal tıraşı, saç+sakal bakımı, cilt bakımı, çocuk tıraşı ve saç boyama hizmetleri sunuyoruz. Güncel fiyatlar için Fiyatlar sayfamızı inceleyebilirsiniz.',
  },
  {
    question: 'Bozyazıdan Anamura ulaşım ne kadar sürer?',
    answer:
      "Bozyazı ile Anamur merkez arası yaklaşık 15 km olup özel araçla ortalama 14 dakika sürer. Detaylar için blog yazımıza bakabilirsiniz.",
  },
];

export default function AnamurBerberPage() {
  const localBusinessSchema = getLocalBusinessSchema();
  const faqSchema = getFAQSchema(faqItems);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Anamur, Mersin</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Anamur Berber — Erkek Kuaförü</h1>
          <p className="text-dark-400 max-w-xl mx-auto">
            {SITE_NAME}, Anamur merkezde premium erkek kuaförü hizmeti sunar. Saç kesiminden ustura
            tıraşına, cilt bakımından saç boyamaya kadar tüm hizmetlerimizi online randevu ile alabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-14">
          {facts.map((fact) => (
            <div key={fact.title} className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 mb-4">
                <fact.icon size={20} className="text-gold-500" />
              </div>
              <h2 className="font-semibold text-white mb-2">{fact.title}</h2>
              <p className="text-sm text-dark-400 leading-relaxed">{fact.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-14">
          <h2 className="font-serif text-2xl font-semibold text-white mb-5 text-center">
            Anamur Merkezdeki Hizmetlerimiz
          </h2>
          <div className="rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden">
            {DEFAULT_SERVICES.map((service, i) => (
              <div
                key={service.id}
                className={`flex items-center justify-between p-5 gap-4 ${
                  i !== DEFAULT_SERVICES.length - 1 ? 'border-b border-dark-700' : ''
                }`}
              >
                <div>
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-dark-500 mt-1">
                    <Clock size={12} />
                    <span>~{service.duration} dakika</span>
                  </div>
                </div>
                <span className="text-lg font-bold text-gold-400 shrink-0">{formatCurrency(service.price)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="font-serif text-2xl font-semibold text-white mb-5">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-dark-700 bg-dark-800 p-5">
                <p className="font-medium text-white mb-2">{item.question}</p>
                <p className="text-sm text-dark-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/appointment">
            <Button size="lg">Anamur Merkezden Randevu Al</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
