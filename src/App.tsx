import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Passes from '@/pages/Passes';
import { Contact, Gallery, NotFound, Sponsors, Team } from '@/pages/Simple';
import { AdminShell, GateShell } from '@/pages/Internal';

export default function App() {
  return (
    <Routes>
      {/* public site */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/passes" element={<Passes />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/team" element={<Team />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* internal — no public chrome */}
      <Route path="/gate" element={<GateShell />} />
      <Route path="/admin" element={<AdminShell />} />
    </Routes>
  );
}
