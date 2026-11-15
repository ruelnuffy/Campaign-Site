import { useEffect, useState } from 'react';

const TARGET_MS = Date.parse('2027-02-06T00:00:00+01:00');
const pad = n => String(n).padStart(2, '0');

function getRemaining() {
  const diff = Math.max(0, TARGET_MS - Date.now());
  return {
    days: String(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    mins: pad(Math.floor((diff % 3600000) / 60000)),
    secs: pad(Math.floor((diff % 60000) / 1000)),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown-band" aria-label="Election countdown">
      <div className="shell">
        <div className="countdown-card">
          <div className="cd-copy">
            <p className="eyebrow">
              <span className="cd-dot" aria-hidden="true" />
              Countdown to Election
            </p>
            <h2>Delivering the HIPE Agenda Across Our Constituency</h2>
          </div>
          <div className="cd-grid" role="timer" aria-live="off">
            <div className="cd-box cd-days">
              <b>{time.days}</b>
              <span>Days</span>
            </div>
            <span className="cd-sep" aria-hidden="true">:</span>
            <div className="cd-box">
              <b>{time.hours}</b>
              <span>Hours</span>
            </div>
            <span className="cd-sep" aria-hidden="true">:</span>
            <div className="cd-box">
              <b>{time.mins}</b>
              <span>Mins</span>
            </div>
            <span className="cd-sep" aria-hidden="true">:</span>
            <div className="cd-box">
              <b>{time.secs}</b>
              <span>Secs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
