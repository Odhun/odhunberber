import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Çerez Politikası' };

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-white mb-8">Çerez Politikası</h1>
        <div className="space-y-6 text-dark-300 leading-relaxed">
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Çerez Kullanımı</h2>
            <p>Bu site, temel işlevsellik için zorunlu çerezler kullanmaktadır. Analitik veya pazarlama amaçlı çerez kullanılmamaktadır.</p>
          </div>
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Zorunlu Çerezler</h2>
            <p>Oturum yönetimi ve güvenlik amacıyla kullanılmaktadır. Bu çerezler devre dışı bırakılamaz.</p>
          </div>
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Çerezleri Kontrol Etme</h2>
            <p>Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz. Ancak bu bazı özelliklerin çalışmamasına neden olabilir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
