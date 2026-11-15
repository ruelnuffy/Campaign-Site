const PILLARS = [
  {
    letter: 'H',
    title: 'Health',
    desc: 'Expanding primary and tertiary healthcare access, medical outreaches, and clean solar-powered water infrastructure across Ohaozara, Onicha, and Ivo.',
  },
  {
    letter: 'I',
    title: 'Infrastructural Development',
    desc: 'Solar mini-grids, street lighting, boreholes, rural access roads, and community facilities that power daily life and local commerce.',
  },
  {
    letter: 'P',
    title: 'Poverty Alleviation & Empowerment',
    desc: 'Indigent housing, skills tools (sewing machines, grinding machines, laptops, tricycles, motorcycles), and federal employment facilitation.',
  },
  {
    letter: 'E',
    title: 'Education',
    desc: 'Classroom block renovations, summer holiday coaching, scholarships, and federal tertiary institution bills for our students.',
  },
];

export default function Agenda() {
  return (
    <section className="section" id="agenda">
      <div className="shell">
        <div className="sec-head">
          <div>
            <p className="eyebrow">HIPE Agenda</p>
            <h2>Four Pillars of Service</h2>
            <p className="sec-sub">
              Every constituency intervention by Hon. (Dr.) Kama Nkemkanma is anchored on the four
              HIPE pillars.
            </p>
          </div>
        </div>

        <div className="hipe-grid">
          {PILLARS.map(pillar => (
            <article className="hipe-card" key={pillar.letter}>
              <span className="hipe-letter">{pillar.letter}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
