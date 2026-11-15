export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell foot-in">
        <div>
          <b>Hon. (Dr.) Kama Nkemkanma, FIMC, CMC</b>
          <p>
            HIPE Agenda &bull; Ohaozara / Onicha / Ivo Federal Constituency &bull;{' '}
            <a className="contact-link" href="tel:07017089013">07017089013</a> &bull;{' '}
            <a className="contact-link" href="mailto:info@kamaconnect.com">info@kamaconnect.com</a>
            {' '}&bull;{' '}
            <a
              className="contact-link"
              href="https://www.facebook.com/profile.php?id=1537517223&mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            {' '}&bull;{' '}
            <a
              className="contact-link"
              href="https://www.instagram.com/nkemkanmakama?rpxt=MndxdzU1bDVwZTFj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </div>
        <nav className="foot-links" aria-label="Footer">
          <a href="#top">Home</a>
          <a href="#agenda">HIPE Agenda</a>
          <a href="#projects">Projects</a>
          <a href="#mandate">Core Mandate</a>
          <a href="#events">Events</a>
          <a href="#involved">Volunteer</a>
        </nav>
      </div>
    </footer>
  );
}
