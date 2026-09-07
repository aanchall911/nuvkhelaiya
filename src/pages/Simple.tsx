import { PageHeader } from '@/components/PageHeader';
import { GalleryWall } from '@/components/GalleryWall';
import { SponsorToran } from '@/components/SponsorToran';
import { TeamGrid } from '@/components/TeamGrid';
import { StageNext } from '@/pages/StageNext';

export function Sponsors() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Powered By Our Partners"
        gujarati="સાથ અને સહકાર"
        intro="NUV Khelaiya is made possible by partners who believe in celebrating culture at scale."
      />
      <SponsorToran />
    </>
  );
}

export function Team() {
  return (
    <>
      <PageHeader
        eyebrow="Organising Team"
        title="Committee Members"
        gujarati="આયોજક ટીમ"
        intro="Meet the dedicated team behind NUV Khelaiya 2026 — students and volunteers who build the celebration from the ground up."
      />
      <TeamGrid />
    </>
  );
}

export function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="2025 Highlights"
        title="Moments From the Ground"
        gujarati="યાદગાર ક્ષણો"
        intro="Garba, Dandiya, people and culture — highlights from NUV Khelaiya 2025."
      />
      <GalleryWall />
    </>
  );
}

export function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach the Organisers"
        gujarati="સંપર્ક કરો"
        intro="Questions about passes, sponsorship, volunteering or media access — start here."
      />
      <StageNext
        title="Contact Form & Venue Details"
        items={[
          'Accessible enquiry form with validation',
          'Venue map and gate-wise entry guidance',
          'Sponsorship and media contact routing',
          'Emergency and help desk information',
        ]}
      />
    </>
  );
}

export function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="This Path Left the Circle"
        gujarati="આ રસ્તો ખોવાઈ ગયો"
        intro="The page you were looking for is not here. Head back to the ground and join the celebration."
      />
      <StageNext
        title="Try One of These"
        items={['Home', 'About the Celebration', 'Passes & Registration', 'Gallery']}
      />
    </>
  );
}
