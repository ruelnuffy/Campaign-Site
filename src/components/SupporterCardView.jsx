import { useState } from 'react';

const BARCODE_BARS = Array.from({ length: 18 }, (_, i) => i);

export default function SupporterCardView({ supporter, onBack }) {
  const [shareStatus, setShareStatus] = useState('');
  const cardNumber = supporter.card_number;
  const fullName = String(supporter.full_name || '').toUpperCase();

  const handleShare = async () => {
    const text = `My HIPE 2.0 Supporter Card ID: ${cardNumber} — Hon. Dr. Nkemkanma Kama (Renewed Hope for FON na HIPE 2.0)`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'HIPE 2.0 Supporter Card', text });
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
          <p className="eyebrow">HIPE 2.0 &bull; Ebonyi State</p>
          <h1>Your HIPE 2.0 Supporter Card</h1>
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

        <section className="id-cards" aria-label="HIPE 2.0 Supporter ID Card">
          <article className="id-card id-front">
            <div className="id-top">
              <div>
                <span className="id-badge">APC &bull; HIPE 2.0</span>
                <h2>HON. DR. NKEMKANMA KAMA</h2>
                <p className="id-slogan">This Renewed Hope for FON na HIPE 2.0</p>
              </div>
              <div className="id-crest" aria-hidden="true">
                HK
              </div>
            </div>

            <div className="id-meta">
              <div>
                <span>CARD ID</span>
                <b>{cardNumber}</b>
              </div>
              <div>
                <span>CONSTITUENCY</span>
                <b>Ohaozara / Onicha / Ivo</b>
              </div>
              <div>
                <span>LGA</span>
                <b>{supporter.lga}</b>
              </div>
              <div>
                <span>WARD</span>
                <b>{supporter.ward}</b>
              </div>
            </div>

            <div className="id-foot">
              <div>
                <span className="id-role">VERIFIED SUPPORTER</span>
                <strong className="id-holder">{fullName}</strong>
              </div>
              <span className="id-state">EBONYI STATE</span>
            </div>
          </article>

          <article className="id-card id-back">
            <div className="id-top">
              <div>
                <span className="id-badge">OFFICIAL SUPPORTER PASS</span>
                <h2>CONTINUA &bull; RENEWED HOPE</h2>
              </div>
              <span className="id-chip" aria-hidden="true" />
            </div>

            <p className="id-advisory">
              This card identifies a registered grassroots supporter of{' '}
              <strong>Hon. Dr. Nkemkanma Kama (Ijele Chukwu)</strong> for Ohaozara / Onicha / Ivo
              Federal Constituency, Ebonyi State.
            </p>

            <div className="id-barcode" aria-hidden="true">
              {BARCODE_BARS.map(i => (
                <span key={i} />
              ))}
            </div>
            <p className="id-back-code">
              {cardNumber} &bull; {supporter.lga} LGA
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
