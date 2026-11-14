import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="topbar" id="topbar">
      <div className="shell topbar-in">
        <a className="brand" href="#top" onClick={close}>
          <img
            className="brand-logo"
            src="/assets/apc-logo.png"
            alt="All Progressives Congress (APC) logo"
            width="48"
            height="43"
          />
          <span className="brand-txt">
            <b>Hon. Nkemkanma Kama</b>
            <span>HIPE 2.0 &bull; Ebonyi State</span>
          </span>
        </a>

        <nav className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label="Primary">
          <a href="#top" onClick={close}>Home</a>
          <a href="#movement" onClick={close}>The Movement</a>
          <a href="#gallery" onClick={close}>Gallery</a>
          <a href="#agenda" onClick={close}>Agenda</a>
          <a href="#involved" onClick={close}>Get Involved</a>
          <a className="btn btn-primary btn-sm" href="#involved" onClick={close}>
            Get Supporter Card
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
