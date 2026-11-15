import { useEffect, useState } from 'react';

const CATEGORIES = [
  'Health',
  'Infrastructural Development',
  'Poverty Alleviation & Empowerment',
  'Education',
];

export default function ProjectsExplorer() {
  const [lgasData, setLgasData] = useState(null);
  const [selectedLga, setSelectedLga] = useState('Ivo');
  const [selectedComm, setSelectedComm] = useState('Ishiagu');

  useEffect(() => {
    fetch('/data/constituency.json')
      .then(r => r.json())
      .then(data => {
        if (data && data.lgas) {
          setLgasData(data.lgas);
        }
      })
      .catch(() => {});
  }, []);

  if (!lgasData) {
    return (
      <section className="section section-tint" id="projects">
        <div className="shell">
          <div className="sec-head">
            <div>
              <p className="eyebrow">HIPE-Agenda Projects</p>
              <h2>Projects by LGA &amp; Community</h2>
              <p className="sec-sub">Loading constituency projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const lgaNames = Object.keys(lgasData);
  const currentLga = lgasData[selectedLga] || lgasData[lgaNames[0]];
  const commNames = Object.keys(currentLga?.communities || {});
  const activeCommName = commNames.includes(selectedComm) ? selectedComm : commNames[0];
  const currentComm = currentLga?.communities?.[activeCommName];
  const projectsByCat = currentComm?.projects || {};

  const handleSelectLga = lga => {
    setSelectedLga(lga);
    const comms = Object.keys(lgasData[lga]?.communities || {});
    setSelectedComm(comms[0] || '');
  };

  return (
    <section className="section section-tint" id="projects">
      <div className="shell">
        <div className="sec-head">
          <div>
            <p className="eyebrow">HIPE-Agenda Projects</p>
            <h2>Explore Projects by LGA &amp; Community</h2>
            <p className="sec-sub">
              Select a Local Government Area, then choose a community to view all projects
              categorized under Health, Infrastructure, Poverty Alleviation &amp; Education.
            </p>
          </div>
        </div>

        <div className="proj-explorer">
          <div className="proj-step">
            <span className="step-lbl">1. Select Local Government Area (LGA)</span>
            <div className="lga-tabs" role="tablist" aria-label="Local Government Areas">
              {lgaNames.map(lga => (
                <button
                  key={lga}
                  type="button"
                  role="tab"
                  aria-selected={selectedLga === lga}
                  className={`tab-pill${selectedLga === lga ? ' is-active' : ''}`}
                  onClick={() => handleSelectLga(lga)}
                >
                  {lga} LGA
                </button>
              ))}
            </div>
          </div>

          <div className="proj-step">
            <span className="step-lbl">2. Communities in {selectedLga} LGA</span>
            <div className="comm-tabs" role="tablist" aria-label={`Communities in ${selectedLga}`}>
              {commNames.map(comm => (
                <button
                  key={comm}
                  type="button"
                  role="tab"
                  aria-selected={activeCommName === comm}
                  className={`tab-pill${activeCommName === comm ? ' is-active' : ''}`}
                  onClick={() => setSelectedComm(comm)}
                >
                  {comm}
                </button>
              ))}
            </div>
          </div>

          {currentComm && (
            <>
              <div className="proj-banner">
                <div>
                  <h3>
                    {activeCommName} Community &bull; {selectedLga} LGA
                  </h3>
                  <p>{currentComm.summary}</p>
                </div>
              </div>

              <div className="proj-cat-grid">
                {CATEGORIES.map(cat => {
                  const items = projectsByCat[cat] || [];
                  return (
                    <article className="proj-cat-card" key={cat}>
                      <div className="proj-cat-head">
                        <h4>{cat}</h4>
                        <span className="proj-count">{items.length}</span>
                      </div>
                      {items.length > 0 ? (
                        <ul className="proj-list">
                          {items.map((item, idx) => (
                            <li className="proj-item" key={`${cat}-${idx}`}>
                              <strong>{item.title}</strong>
                              <div className="proj-meta">
                                {item.location && <span>Location: {item.location}</span>}
                                {item.status && <span className="proj-badge">{item.status}</span>}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="proj-empty">
                          Ongoing community needs assessment &amp; project updates for{' '}
                          {activeCommName} under {cat}.
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
