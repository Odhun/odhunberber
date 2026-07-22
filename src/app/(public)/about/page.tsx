import { Metadata } from 'next';
import { Award, Users, MapPin, Scissors } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { SITE_NAME, DEFAULT_SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: `${SITE_NAME} hakkında bilgi edinin. Anamur merkezdeki berber ekibimiz ve premium hizmet anlayışımız.`,
};

const stats = [
  { icon: MapPin, value: 'Anamur', label: 'Merkez Salon' },
  { icon: Scissors, value: String(DEFAULT_SERVICES.length), label: 'Hizmet Çeşidi' },
  { icon: Users, value: 'Randevulu', label: 'Çalışma Sistemi' },
  { icon: Award, value: 'Özenli', label: 'İşçilik Anlayışı' },
];

const team = [
  { role: 'Baş Berber', focus: 'Saç kesimi, stil danışmanlığı ve saç boyama' },
  { role: 'Sakal & Tıraş Uzmanı', focus: 'Klasik ustura tıraşı ve sakal bakımı' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Biz Kimiz</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Hakkımızda</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-14">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-dark-700 bg-dark-800 p-5 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                  <stat.icon size={20} />
                </div>
              </div>
              <p className="font-serif text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-dark-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8 text-dark-300 leading-relaxed">
          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
            <h2 className="font-serif text-2xl font-semibold text-white mb-4">Hikayemiz</h2>
            <p>
              Odhun Berber, Anamur merkezde klasik berber sanatını modern teknikler ve premium bir
              deneyimle birleştirme vizyonuyla hizmet veriyor. Her müşterimize sadece saç kesimi değil,
              tam bir bakım deneyimi sunmayı hedefliyoruz.
            </p>
          </div>

          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
            <h2 className="font-serif text-2xl font-semibold text-white mb-4">Vizyonumuz</h2>
            <p>
              Anamur ve çevresinde tercih edilen bir berber salonu olmak ve her müşterimizin güven
              içinde, rahat ve özel hissettiği bir alan yaratmak.
            </p>
          </div>

          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
            <h2 className="font-serif text-2xl font-semibold text-white mb-4">Değerlerimiz</h2>
            <ul className="space-y-2">
              {[
                'Kalite ve titizlik — her kesimde mükemmelliği hedefliyoruz',
                'Güven — kişisel verilerinizi koruyoruz',
                'Şeffaflık — net fiyatlandırma, sürpriz yok',
                'Müşteri memnuniyeti — siz mutlu olana kadar işimiz bitmez',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6">
            <h2 className="font-serif text-2xl font-semibold text-white mb-4">Ekibimiz</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
              {team.map((member) => (
                <div key={member.role} className="rounded-xl bg-dark-900/60 border border-dark-700 p-4">
                  <p className="font-medium text-white">{member.role}</p>
                  <p className="text-sm text-dark-400 mt-1">{member.focus}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-dark-500 italic">
              Ekibimizin fotoğraf ve isimlerini yakında burada paylaşacağız.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/appointment">
            <Button size="lg">Randevu Al</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
