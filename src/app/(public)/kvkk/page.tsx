import { Metadata } from 'next';
import { SITE_NAME, CONTACT } from '@/lib/constants';

export const metadata: Metadata = { title: 'KVKK Aydınlatma Metni' };

export default function KVKKPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-white mb-2">KVKK Aydınlatma Metni</h1>
        <p className="text-dark-400 mb-8">6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında</p>
        <div className="space-y-6 text-dark-300 leading-relaxed">
          <section className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Veri Sorumlusu</h2>
            <p><span className="text-dark-400">Unvan:</span> {SITE_NAME}</p>
            <p><span className="text-dark-400">Adres:</span> {CONTACT.address}</p>
            <p><span className="text-dark-400">E-posta:</span> {CONTACT.email}</p>
          </section>
          <section className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">İşlenen Kişisel Veriler</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Ad ve Soyad</li>
              <li>Telefon numarası</li>
              <li>Randevu tarihi ve saati</li>
              <li>Talep edilen hizmet bilgisi</li>
            </ul>
          </section>
          <section className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">İşleme Amaçları</h2>
            <p>Kişisel verileriniz yalnızca randevu sisteminin işletilmesi ve randevu onay/iptal bildirimlerinin yapılması amacıyla işlenmektedir.</p>
          </section>
          <section className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Haklarınız</h2>
            <p>KVKK Madde 11 kapsamında kişisel verilerinize ilişkin bilgi alma, düzeltme, silme ve itiraz haklarınız bulunmaktadır. Taleplerinizi {CONTACT.email} adresine iletebilirsiniz.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
