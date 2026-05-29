import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import PricesSection from '@/components/home/PricesSection';
import WorkingHoursSection from '@/components/home/WorkingHoursSection';
import LocationSection from '@/components/home/LocationSection';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Premium Erkek Kuaförü`,
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <PricesSection />
      <WorkingHoursSection />
      <LocationSection />
    </div>
  );
}
