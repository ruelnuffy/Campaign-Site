export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <h1>
            Hon. Dr. Nkemkanma Kama <span className="badge-20">HIPE 2.0</span>
          </h1>
          <p className="hero-slogan">
            This Renewed Hope for <strong>FON</strong> na <strong>HIPE 2.0</strong>
          </p>
          <p className="hero-lede">
            Continuity, grassroots empowerment, and bold representation for Ohaozara, Onicha, and Ivo in Ebonyi State.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#agenda">Explore the Agenda &rarr;</a>
            <a className="btn btn-outline-light" href="#involved">Get Supporter ID Card</a>
          </div>
        </div>

        <div className="hero-visual">
          <figure className="hero-frame">
            <img
              src="/assets/photos/kama-office-portrait.jpg"
              alt="Hon. Dr. Nkemkanma Kama seated in office regalia"
              width="900"
              height="900"
            />
            <figcaption>
              <span className="cap-tag">Ijele Chukwu</span>
              <span className="cap-sub">House of Representatives</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
