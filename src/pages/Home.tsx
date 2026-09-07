import { Hero } from '@/components/Hero';
import { EventIntro } from '@/components/EventIntro';
import { ExperienceCards } from '@/components/ExperienceCards';
import { Schedule } from '@/components/Schedule';
import { PassPromo } from '@/components/PassPromo';

export default function Home() {
  return (
    <>
      <Hero />
      <EventIntro />
      <ExperienceCards />
      <Schedule />
      <PassPromo />
    </>
  );
}
