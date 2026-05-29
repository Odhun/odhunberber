import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
export const metadata: Metadata = { title: 'Kullanım Koşulları' };

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-white mb-8">Kullanım Koşulları</h1>
        <div className="space-y-6 text-dark-300 leading-relaxed">
          {[
            { title: 'Randevu Koşulları', content: 'Oluşturulan randevu talepleri admin onayına tabidir. Onaylanan randevular için zamanında gelmenizi bekliyoruz. 15 dakikadan fazla gecikme durumunda randevunuz iptal edilebilir.' },
            { title: 'İptal Politikası', content: 'Randevunuzu en az 2 saat öncesinden iptal etmenizi rica ederiz. Sürekli iptal durumlarında randevu hakkı kısıtlanabilir.' },
            { title: 'Sorumluluk', content: `${SITE_NAME}, sunulan hizmetlerin kalitesinden sorumludur. Müşteri memnuniyetsizliği durumunda lütfen bizimle iletişime geçin.` },
            { title: 'Değişiklikler', content: 'Bu koşullar önceden haber verilmeksizin değiştirilebilir. Güncel koşullar için bu sayfayı düzenli kontrol edin.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-dark-700 bg-dark-800 p-5">
              <h2 className="text-lg font-semibold text-white mb-3">{item.title}</h2>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
