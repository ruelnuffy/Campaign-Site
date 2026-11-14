import { useRef } from 'react';

const ITEMS = [
  {
    src: '/assets/photos/kama-apc-rally.jpg',
    alt: 'Hon. Dr. Nkemkanma Kama addressing supporters in APC attire',
    caption: 'Engaging grassroots supporters across Ohaozara, Onicha, and Ivo.',
  },
  {
    src: '/assets/photos/kama-office-portrait.jpg',
    alt: 'Hon. Dr. Nkemkanma Kama official portrait',
    caption: 'Dedicated legislative representation at the House of Representatives.',
  },
  {
    src: '/assets/photos/renewed-hope-fon-hipe.jpg',
    alt: 'Renewed Hope for FON na HIPE Continua',
    caption: 'Renewed Hope for FON na HIPE 2.0 — Continua.',
  },
];

export default function Gallery() {
  const trackRef = useRef(null);

  const scrollTrack = delta => {
    trackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="section section-tint" id="gallery">
      <div className="shell">
        <div className="sec-head">
          <div>
            <p className="eyebrow">On the Ground</p>
            <h2>Moments across the constituency</h2>
          </div>
          <div className="gal-controls">
            <button
              className="gal-btn"
              type="button"
              aria-label="Previous photo"
              onClick={() => scrollTrack(-320)}
            >
              &larr;
            </button>
            <button
              className="gal-btn"
              type="button"
              aria-label="Next photo"
              onClick={() => scrollTrack(320)}
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="gallery-track" ref={trackRef}>
          {ITEMS.map(item => (
            <figure className="gal-card" key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
