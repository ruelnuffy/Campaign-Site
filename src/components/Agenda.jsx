const PILLARS = [
  {
    num: '01',
    title: 'Rural Roads & Water',
    desc: 'Connecting farming communities and markets across Ohaozara, Onicha, and Ivo with durable access roads and clean water.',
  },
  {
    num: '02',
    title: 'Youth & Enterprise',
    desc: 'Skills grants, digital training, and small-business support so young people build thriving livelihoods at home.',
  },
  {
    num: '03',
    title: 'Schools & Healthcare',
    desc: 'Scholarships, classroom upgrades, and accessible primary healthcare centres in every ward.',
  },
  {
    num: '04',
    title: 'Strong Voice in Abuja',
    desc: 'Consistent, people-first bills and federal constituency interventions that bring tangible value back to Ebonyi.',
  },
];

export default function Agenda() {
  return (
    <section className="section" id="agenda">
      <div className="shell">
        <div className="sec-head">
          <div>
            <p className="eyebrow">HIPE 2.0 Agenda</p>
            <h2>Four pillars for our people</h2>
          </div>
        </div>

        <div className="agenda-grid">
          {PILLARS.map(pillar => (
            <article className="agenda-card" key={pillar.num}>
              <span className="ag-num">{pillar.num}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
