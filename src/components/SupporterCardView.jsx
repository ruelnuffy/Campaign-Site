import { useState } from 'react';

const BARCODE_BARS = Array.from({ length: 18 }, (_, i) => i);

export default function SupporterCardView({ supporter, onBack }) {
  const [shareStatus, setShareStatus] = useState('');
  const cardNumber = supporter.card_number;
  const fullName = String(supporter.full_name || '').toUpperCase();

  const handleShare = async () => {
    const text = `My HIPE-Agenda Volunteer Card ID: ${cardNumber} — Hon. (Dr.) Kama Nkemkanma, FIMC, CMC (kamaconnect.com)`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'HIPE-Agenda Volunteer Card', text });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setShareStatus('Card ID copied to clipboard.');
    }
  };

  return (
    <div className="subpage card-page">
      <main className="card-shell">
        <button type="button" className="back-link back-btn no-print" onClick={onBack}>
          &larr; Back to home
        </button>

        <header className="card-head no-print">
          <p className="eyebrow">HIPE Agenda &bull; Ebonyi State</p>
          <h1>Your HIPE-Agenda Volunteer Card</h1>
          <p className="card-id-note">
            Card ID: <strong>{cardNumber}</strong> &mdash; Save this ID to reprint your card anytime.
          </p>
          <div className="card-toolbar">
            <button className="btn btn-primary" type="button" onClick={() => window.print()}>
              Print / Save PDF
            </button>
            <button className="btn btn-ghost-dark" type="button" onClick={handleShare}>
              Share Card ID
            </button>
          </div>
          <p className="share-status" role="status" aria-live="polite">
            {shareStatus}
          </p>
        </header>

        <section className="id-cards" aria-label="HIPE-Agenda Volunteer ID Card">
          <article className="id-card id-front">
            <div className="id-top">
              <div>
                <span className="id-badge">APC &bull; HIPE AGENDA</span>
                <h2>HON. (DR.) KAMA NKEMKANMA</h2>
                <p className="id-slogan">FIMC, CMC &bull; Ohaozara / Onicha / Ivo</p>
              </div>
              <div className="dual-logos white-logos" aria-hidden="true">
                <img className="logo-apc" src="/assets/apc-logo.png" alt="" height="28" />
                <img className="logo-hipe" src="/assets/hipe-logo.jpg" alt="" height="28" />
              </div>
            </div>

            <div className="id-meta">
              <div>
                <span>CARD ID</span>
                <b>{cardNumber}</b>
              </div>
              <div>
                <span>LGA</span>
                <b>{supporter.lga}</b>
              </div>
              <div>
                <span>COMMUNITY</span>
                <b>{supporter.community || '—'}</b>
              </div>
              <div>
                <span>WARD</span>
                <b>{supporter.ward}</b>
              </div>
              <div>
                <span>POLLING UNIT</span>
                <b>{supporter.polling_unit || '—'}</b>
              </div>
              <div>
                <span>EMAIL</span>
                <b>{supporter.email || '—'}</b>
              </div>
            </div>

            <div className="id-foot">
              <div>
                <span className="id-role">HIPE-AGENDA VOLUNTEER MEMBER</span>
                <strong className="id-holder">{fullName}</strong>
              </div>
              <span className="id-state">EBONYI STATE</span>
            </div>
          </article>

          <article className="id-card id-back">
            <div className="id-top">
              <div>
                <span className="id-badge">OFFICIAL VOLUNTEER PASS</span>
                <h2>HIPE AGENDA &bull; KAMACONNECT</h2>
              </div>
              <span className="id-chip" aria-hidden="true" />
            </div>

            <p className="id-advisory">
              This card identifies a registered HIPE-Agenda Volunteer Member supporting{' '}
              <strong>Hon. (Dr.) Kama Nkemkanma, FIMC, CMC</strong> for Ohaozara / Onicha / Ivo
              Federal Constituency, Ebonyi State.
            </p>

            <div className="id-barcode" aria-hidden="true">
              {BARCODE_BARS.map(i => (
                <span key={i} />
              ))}
            </div>
            <p className="id-back-code">
              {cardNumber} &bull; {supporter.lga} LGA &bull; {supporter.community}
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
