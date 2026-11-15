import { useRef } from 'react';

const ITEMS = [
  {
    src: '/assets/photos/kama-gallery/kama-2.jpg',
    alt: 'Hon. (Dr.) Kama Nkemkanma seated in the House of Representatives Green Chamber',
    caption: 'Representing Ohaozara, Onicha & Ivo on the floor of the Green Chamber.',
  },
  {
    src: '/assets/photos/kama-gallery/kama-3.jpg',
    alt: 'Hon. (Dr.) Kama Nkemkanma in traditional Isiagu attire speaking with NTA and Afia TV journalists',
    caption: 'Briefing national press on legislative bills and constituency priorities.',
  },
  {
    src: '/assets/photos/kama-gallery/kama-1.jpg',
    alt: 'Hon. (Dr.) Kama Nkemkanma at a National Assembly committee hearing',
    caption: 'Active oversight and committee deliberations in Abuja.',
  },
  {
    src: '/assets/photos/kama-gallery/kama-4.jpg',
    alt: 'Hon. (Dr.) Kama Nkemkanma walking through the National Assembly corridor with legislative briefs',
    caption: 'Advancing bills, motions, and petitions for our communities.',
  },
  {
    src: '/assets/photos/kama-gallery/kama-5.jpg',
    alt: 'Hon. (Dr.) Kama Nkemkanma in a bilateral diplomatic engagement',
    caption: 'Building international partnerships for infrastructure and development.',
  },
  {
    src: '/assets/photos/kama-apc-rally.jpg',
    alt: 'Hon. (Dr.) Kama Nkemkanma addressing supporters in APC attire',
    caption: 'Engaging grassroots communities across Ohaozara, Onicha, and Ivo.',
  },
  {
    src: '/assets/photos/kama-office-portrait.jpg',
    alt: 'Hon. (Dr.) Kama Nkemkanma official portrait',
    caption: 'Dedicated legislative representation at the House of Representatives.',
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
            <p className="eyebrow">On the Ground &amp; In the Chamber</p>
            <h2>Moments in service of our people</h2>
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
