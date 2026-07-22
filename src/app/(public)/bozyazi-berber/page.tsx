import { Metadata } from 'next';
import Link from 'next/link';
import { Car, Waves, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SITE_NAME } from '@/lib/constants';
import { getFAQSchema } from '@/app/schema';

export const metadata: Metadata = {
  title: "Bozyazı'dan Berber Randevusu — Anamur Merkez Salonumuz",
  description: `${SITE_NAME}, Anamur merkezdeki salonuyla Bozyazı'dan gelen müşterilerine de hizmet vermektedir. Online randevu alın.`,
};

const faqItems = [
  {
    question: 'Bozyazıda şubeniz var mı?',
    answer:
      "Hayır, ikinci bir şubemiz bulunmuyor. Tek salonumuz Anamur merkezde hizmet vermektedir; Bozyazı'dan gelen müşterilerimizi de memnuniyetle ağırlıyoruz.",
  },
  {
    question: "Bozyazı'dan Anamur'a ulaşım ne kadar sürer?",
    answer:
      'Kara yoluyla yaklaşık 15 kilometre olup özel araçla ortalama 14 dakika sürmektedir. Sahil yolu güzergahı kullanılabilir.',
  },
  {
    question: 'Randevumu Bozyazıdan online alabilir miyim?',
    answer:
      'Evet, randevu sistemimiz tamamen online çalışır; nereden randevu aldığınız fark etmeksizin uygun saati seçip randevunuzu oluşturabilirsiniz.',
  },
];

export default function BozyaziBerberPage() {
  const faqSchema = getFAQSchema(faqItems);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Bozyazı, Mersin</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">
            Bozyazı&apos;dan Berber Randevusu
          </h1>
          <p className="text-dark-400 max-w-xl mx-auto">
            {SITE_NAME}&apos;in tek salonu Anamur merkezdedir; Bozyazı&apos;dan gelen müşterilerimizi de
            memnuniyetle karşılıyoruz. Aşağıda mesafe, ulaşım ve randevu bilgilerini bulabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-14">
          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 mb-4">
              <Car size={20} className="text-gold-500" />
            </div>
            <h2 className="font-semibold text-white mb-2">~15 km / ~14 dk</h2>
            <p className="text-sm text-dark-400 leading-relaxed">
              Bozyazı ile Anamur merkez arası özel araçla yaklaşık 14 dakika sürer.
            </p>
          </div>
          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 mb-4">
              <Waves size={20} className="text-gold-500" />
            </div>
            <h2 className="font-semibold text-white mb-2">Tekeli & Tekmen Sahilleri</h2>
            <p className="text-sm text-dark-400 leading-relaxed">
              Bozyazı, Tekeli ve Tekmen sahilleriyle bilinen, yaz aylarında yoğun ziyaretçi ağırlayan bir
              ilçedir.
            </p>
          </div>
          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 mb-4">
              <MapPin size={20} className="text-gold-500" />
            </div>
            <h2 className="font-semibold text-white mb-2">Tek Salon: Anamur Merkez</h2>
            <p className="text-sm text-dark-400 leading-relaxed">
              Bozyazı&apos;da fiziksel bir şubemiz bulunmuyor; hizmetlerimiz Anamur merkezdeki salonumuzda
              verilmektedir.
            </p>
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
            <Button size="lg">Randevu Al</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
