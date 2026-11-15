export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="hero-logos-row">
            <img
              className="logo-apc"
              src="/assets/apc-logo.png"
              alt="APC Logo"
              height="44"
            />
            <img
              className="logo-hipe"
              src="/assets/hipe-logo.jpg"
              alt="HIPE Agenda Logo"
              height="44"
            />
          </div>
          <h1>
            Hon. (Dr.) Kama Nkemkanma <span className="badge-20">FIMC, CMC</span>
          </h1>
          <p className="hero-slogan">
            The <strong>HIPE Agenda</strong> — Health, Infrastructure, Poverty Alleviation &amp; Education
          </p>
          <p className="hero-lede">
            Focused legislative representation and measurable community projects across Ohaozara,
            Onicha, and Ivo Federal Constituency, Ebonyi State.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">Explore HIPE Projects &rarr;</a>
            <a className="btn btn-outline-light" href="#involved">Become a Volunteer</a>
          </div>
        </div>

        <div className="hero-visual">
          <figure className="hero-frame">
            <img
              src="/assets/photos/kama-office-portrait.jpg"
              alt="Hon. (Dr.) Kama Nkemkanma, FIMC, CMC seated in office regalia"
              width="900"
              height="900"
            />
            <figcaption>
              <span className="cap-tag">HIPE Agenda</span>
              <span className="cap-sub">House of Representatives &bull; kamaconnect.com</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
