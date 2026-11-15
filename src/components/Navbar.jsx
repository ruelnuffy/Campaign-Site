import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="topbar" id="topbar">
      <div className="shell topbar-in">
        <a className="brand" href="#top" onClick={close}>
          <span className="dual-logos white-logos">
            <img
              className="logo-apc"
              src="/assets/apc-logo.png"
              alt="All Progressives Congress (APC) logo"
              width="38"
              height="34"
            />
            <img
              className="logo-hipe"
              src="/assets/hipe-logo.jpg"
              alt="HIPE Agenda logo"
              width="62"
              height="34"
            />
          </span>
          <span className="brand-txt">
            <b>Hon. (Dr.) Kama Nkemkanma</b>
            <span>HIPE Agenda &bull; Ohaozara / Onicha / Ivo</span>
          </span>
        </a>

        <nav className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label="Primary">
          <a href="#top" onClick={close}>Home</a>
          <a href="#agenda" onClick={close}>HIPE Agenda</a>
          <a href="#projects" onClick={close}>Projects</a>
          <a href="#mandate" onClick={close}>Core Mandate</a>
          <a href="#events" onClick={close}>Events</a>
          <a href="#gallery" onClick={close}>Gallery</a>
          <a className="btn btn-primary btn-sm" href="#involved" onClick={close}>
            Become a Volunteer
          </a>
        </nav>

        <button
          className="burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
