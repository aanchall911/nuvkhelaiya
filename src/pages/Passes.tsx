import { PageHeader } from '@/components/PageHeader';
import { PassPromo } from '@/components/PassPromo';
import { EVENT } from '@/lib/event';

export default function Passes() {
  return (
    <>
      <PageHeader
        eyebrow="Passes"
        title="Your Pass to the Night"
        gujarati="એક પાસ, એક પ્રવેશ"
        intro={`One night of Garba — ${EVENT.day}, ${EVENT.dateLong}, from ${EVENT.time} at ${EVENT.venue}. Pick a pass, register online, and walk straight in.`}
      />
      <PassPromo showHeading={false} />
    </>
  );
}
