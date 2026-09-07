import { Hero } from '@/components/Hero';
import { InvitationBand } from '@/components/InvitationBand';
import { EventIntro } from '@/components/EventIntro';
import { ExperienceCards } from '@/components/ExperienceCards';
import { Schedule } from '@/components/Schedule';
import { PassPromo } from '@/components/PassPromo';

export default function Home() {
  return (
    <>
      <Hero />
      <InvitationBand />
      <EventIntro />
      <ExperienceCards />
      <Schedule />
      <PassPromo />
    </>
  );
}
