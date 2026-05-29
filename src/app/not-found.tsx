import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark-950 px-4 text-center">
      <p className="font-serif text-8xl font-bold text-gold-500 mb-4">404</p>
      <h1 className="text-2xl font-semibold text-white mb-3">Sayfa Bulunamadı</h1>
      <p className="text-dark-400 mb-8">Aradığınız sayfa mevcut değil.</p>
      <Link href="/">
        <Button>Ana Sayfaya Dön</Button>
      </Link>
    </div>
  );
}
