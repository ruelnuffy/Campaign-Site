const LEADERS = [
  {
    name: 'His Excellency Bola Ahmed Tinubu, GCFR',
    role: 'President, Federal Republic of Nigeria — Renewed Hope',
  },
  {
    name: 'Rt. Hon. Bldr. Francis Ogbonnaya Nwifuru',
    role: 'Executive Governor, Ebonyi State — FON',
  },
  {
    name: 'Hon. Dr. Nkemkanma Kama, FIMC, CMC',
    role: 'Member, House of Representatives — HIPE 2.0',
  },
];

export default function Movement() {
  return (
    <section className="section" id="movement">
      <div className="shell">
        <div className="movement-grid">
          <div className="movement-media">
            <img
              src="/assets/photos/renewed-hope-fon-hipe.jpg"
              alt="Renewed Hope for FON na HIPE Continua banner featuring President Tinubu, Governor Francis Nwifuru, and Hon. Dr. Kama Nkemkanma"
              loading="lazy"
            />
          </div>
          <div className="movement-copy">
            <p className="eyebrow">The Movement</p>
            <h2>One aligned vision from Abuja to Ebonyi wards.</h2>
            <p>
              Rooted in the APC Renewed Hope agenda and Governor Francis Ogbonnaya Nwifuru&rsquo;s
              People&rsquo;s Charter of Needs, <strong>HIPE 2.0</strong> delivers practical projects
              straight to Ohaozara, Onicha, and Ivo communities.
            </p>
            <div className="leader-stack">
              {LEADERS.map(leader => (
                <div className="leader-item" key={leader.name}>
                  <b>{leader.name}</b>
                  <span>{leader.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
