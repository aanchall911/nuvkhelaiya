import { EVENT } from '@/lib/event';
import { PageHeader } from '@/components/PageHeader';
import { EventIntro } from '@/components/EventIntro';
import { ExperienceCards } from '@/components/ExperienceCards';
import { Schedule } from '@/components/Schedule';

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Celebrate • Dance • Devotion"
        title="About the Celebration"
        gujarati="નવ રાત્રિ, નવ રંગ, એક પરંપરા"
        intro={`NUV Khelaiya brings the ground, the garbo and the circle back to the centre of Navratri. One night of Garba and Dandiya — ${EVENT.day}, ${EVENT.dateLong}.`}
      />
      <EventIntro />
      <ExperienceCards />
      <Schedule />
    </>
  );
}
