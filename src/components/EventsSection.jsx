import { useState } from 'react';
import { LGA_COMMUNITIES } from '../utils/supporterStore';
import { UPCOMING_EVENTS, registerForEvent } from '../utils/eventStore';

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState(UPCOMING_EVENTS[0].title);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [lga, setLga] = useState('');
  const [community, setCommunity] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmed, setConfirmed] = useState(null);

  const communityList = LGA_COMMUNITIES[lga] || [];

  const handleSubmit = e => {
    e.preventDefault();
    const res = registerForEvent({
      eventTitle: selectedEvent,
      name,
      phone,
      email,
      lga,
      community,
    });
    if (res.ok) {
      setErrorMsg('');
      setConfirmed(res.registration);
    } else {
      setConfirmed(null);
      setErrorMsg(res.errors.join(' '));
    }
  };

  return (
    <section className="section section-tint" id="events">
      <div className="shell">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Upcoming Events</p>
            <h2>Ohanivo Constituency Events</h2>
            <p className="sec-sub">
              Select an upcoming event below and register to participate across Ohaozara, Onicha,
              and Ivo.
            </p>
          </div>
        </div>

        <div className="events-layout">
          <div className="events-grid">
            {UPCOMING_EVENTS.map(ev => {
              const isSelected = selectedEvent === ev.title;
              return (
                <article
                  key={ev.id}
                  className={`event-card${isSelected ? ' is-selected' : ''}`}
                >
                  <span className="status-tag">{ev.tag}</span>
                  <h3>{ev.title}</h3>
                  <p>{ev.desc}</p>
                  <button
                    type="button"
                    className={`tab-pill${isSelected ? ' is-active' : ''}`}
                    onClick={() => {
                      setSelectedEvent(ev.title);
                      setConfirmed(null);
                    }}
                  >
                    {isSelected ? 'Selected for Registration' : 'Register for this Event'}
                  </button>
                </article>
              );
            })}
          </div>

          <div className="panel-box event-form-box">
            <h3>Event Registration</h3>
            <p className="panel-sub">
              Registering for: <strong>{selectedEvent}</strong>
            </p>

            <form className="join-form" onSubmit={handleSubmit}>
              <div className="f">
                <label htmlFor="ev-select">Event</label>
                <select
                  id="ev-select"
                  value={selectedEvent}
                  onChange={e => {
                    setSelectedEvent(e.target.value);
                    setConfirmed(null);
                  }}
                >
                  {UPCOMING_EVENTS.map(ev => (
                    <option key={ev.id} value={ev.title}>
                      {ev.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="two">
                <div className="f">
                  <label htmlFor="ev-name">Full name</label>
                  <input
                    id="ev-name"
                    type="text"
                    required
                    maxLength={80}
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="f">
                  <label htmlFor="ev-phone">Phone number</label>
                  <input
                    id="ev-phone"
                    type="text"
                    required
                    maxLength={20}
                    inputMode="tel"
                    placeholder="0701 708 9013"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="f">
                <label htmlFor="ev-email">Email address</label>
                <input
                  id="ev-email"
                  type="email"
                  required
                  maxLength={120}
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="two">
                <div className="f">
                  <label htmlFor="ev-lga">LGA</label>
                  <select
                    id="ev-lga"
                    required
                    value={lga}
                    onChange={e => {
                      setLga(e.target.value);
                      setCommunity('');
                    }}
                  >
                    <option value="">Select LGA</option>
                    <option value="Ohaozara">Ohaozara</option>
                    <option value="Onicha">Onicha</option>
                    <option value="Ivo">Ivo</option>
                  </select>
                </div>
                <div className="f">
                  <label htmlFor="ev-comm">Community</label>
                  <select
                    id="ev-comm"
                    required
                    value={community}
                    onChange={e => setCommunity(e.target.value)}
                  >
                    <option value="">{lga ? 'Select Community' : 'Choose LGA first'}</option>
                    {communityList.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {errorMsg && (
                <p className="form-status" role="status" aria-live="polite">
                  {errorMsg}
                </p>
              )}

              {confirmed && (
                <div className="event-pass" role="status" aria-live="polite">
                  <span className="status-tag">Registration Confirmed</span>
                  <strong>{confirmed.event_title}</strong>
                  <p>
                    Pass ID: <b>{confirmed.reg_id}</b> &bull; {confirmed.full_name} (
                    {confirmed.community}, {confirmed.lga} LGA)
                  </p>
                </div>
              )}

              <button className="btn btn-primary btn-full" type="submit">
                Complete Event Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
