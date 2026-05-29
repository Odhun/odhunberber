import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = { title: 'Gizlilik Politikası' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 prose prose-invert">
        <h1 className="font-serif text-3xl font-bold text-white">Gizlilik Politikası</h1>
        <p className="text-dark-400">Son güncelleme: Ocak 2025</p>
        <div className="mt-8 space-y-6 text-dark-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Toplanan Bilgiler</h2>
            <p>Randevu sistemi aracılığıyla ad soyad ve telefon numarası bilgileriniz toplanmaktadır. Bu bilgiler yalnızca randevu işlemleri için kullanılmaktadır.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Bilgilerin Kullanımı</h2>
            <p>Kişisel bilgileriniz randevu onayı ve yönetimi amacıyla kullanılmaktadır. Üçüncü taraflarla paylaşılmamaktadır.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Güvenlik</h2>
            <p>Bilgileriniz Firebase güvenli altyapısında şifreli olarak saklanmaktadır.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Haklarınız</h2>
            <p>Kişisel verilerinize erişim, düzeltme veya silme talebinde bulunmak için bizimle iletişime geçebilirsiniz.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
