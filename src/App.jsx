import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Agenda from './components/Agenda';
import ProjectsExplorer from './components/ProjectsExplorer';
import CoreMandate from './components/CoreMandate';
import Gallery from './components/Gallery';
import EventsSection from './components/EventsSection';
import SupporterSection from './components/SupporterSection';
import SupporterCardView from './components/SupporterCardView';
import Footer from './components/Footer';
import LanguagePill from './components/LanguagePill';

export default function App() {
  const [supporter, setSupporter] = useState(null);

  if (supporter) {
    return (
      <>
        <SupporterCardView
          supporter={supporter}
          onBack={() => {
            setSupporter(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <LanguagePill />
      </>
    );
  }

  return (
    <>
      <div className="page-watermark" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Agenda />
        <ProjectsExplorer />
        <CoreMandate />
        <EventsSection />
        <Gallery />
        <SupporterSection
          onCardReady={data => {
            setSupporter(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>
      <Footer />
      <LanguagePill />
    </>
  );
}
