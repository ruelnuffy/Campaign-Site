import { useState } from 'react';

const BILLS = [
  {
    title: '1. Corporate Bodies (Members Emolument) Act (Repeal) Bill, 2023',
    desc: 'A Bill for an Act to Repeal the Corporate Bodies (Members Emolument) Act, Cap C30, Laws of the Federation of Nigeria, 2004; and for Related Matters.',
  },
  {
    title: '2. Environmental Restoration Agency (Establishment) Bill, 2023',
    desc: 'A Bill for an Act to Provide for the Establishment of the Environmental Restoration Agency Charged with the Responsibility for the Remediation of Impacted Environment and the Rehabilitation of Impacted Communities; and for Other Matters Connected Therewith.',
  },
  {
    title: '3. Minerals and Mining Act (Amendment) Bill, 2023',
    desc: 'A Bill for an Act to Amend the Minerals and Mining Act, Cap. M12, Laws of the Federation of Nigeria, 2004 to Encourage Further Domestic and Foreign Investments in the Solid Mineral Subsector; and for Related Matters.',
  },
  {
    title: '4. National Youth Service Corps Act (Amendment) Bill, 2023',
    desc: 'A Bill for an Act to Amend the National Youth Service Corps Act, Cap. N84, Laws of the Federation of Nigeria, 2004 to Provide for Mandatory Intake of Corps Members by Government Agencies, For Their Safety and Protection; and for Related Matters.',
  },
  {
    title: '5. Weights and Measures Act (Amendment) Bill, 2023',
    desc: 'A Bill for an Act to Amend the Weights and Measures Act, Cap. W3, Laws of the Federation of Nigeria, 2004; to Review the Fines Stipulated for Offences Under the Act; and for Related Matters.',
  },
  {
    title: '6. Institute of Film and Media Technology Ukawu, Ebonyi State (Establishment) Bill, 2024',
    desc: 'An Act to provide for the establishment of the Institute of Film and Media Technology Ukawu, Ebonyi State and for related matters.',
  },
  {
    title: '7. Constitution of the Federal Republic of Nigeria Alteration Bill',
    desc: 'Bill for an Act to alter the Constitution of the Federal Republic of Nigeria, 1999 (As amended) and for Related Matters.',
  },
  {
    title: '8. Federal Medical Centres (Establishment) Act No. 33 of 2022 (Amendment) Bill',
    desc: 'Bill for an Act to Amend the Federal Medical Centres (Establishment) Act No. 33 of 2022 to provide Primary Tertiary Healthcare Services in All Ramifications; and for Related Matters.',
    remark: 'Remark: Fully passed',
  },
  {
    title: '9. Federal University of Agriculture and Development Studies, Ishiagu (Establishment) Bill, 2025 (HB.2052)',
    desc: 'A Bill to establish the Federal University of Agriculture and Development Studies, Ishiagu, Ebonyi State.',
    remark: 'Remark: Third Reading passed',
  },
  {
    title: '10. Federal Universities of Technology Act (Amendment) Bill, 2026 (HB. 2873)',
    desc: 'This Bill seeks to amend the Federal Universities of Technology Act to upgrade the Federal College of Education (Technical) Isu to Federal University of Technology, Isu.',
  },
];

const PETITIONS = [
  {
    title: "1. Mgbom N'Achara Petition",
    desc: 'Petition on constant killings, arsons and destruction of properties in their community.',
    remark: '26th July, 2023',
  },
];

const MOTIONS = [
  '1. Motion to End Abaomege-Ishinkwo Crisis',
  '2. Motion to Forestall High Mortality Rate Occasioned by High Manganese Ion Concentration in Water in Ugwulangwu, Ukawu and Onicha Igboeze Communities',
  '3. Motion to Suspend Hike in Electricity Tariff by NERC',
  "4. Order of Privilege Refuting the Allegation from Binance CEO That NASS Members Collected Bribe from His Company's Representatives",
  '5. Motion for an Urgent Call for Enquiry into the Circumstances Surrounding the Cancellation of Visas of 264 Passengers Aboard Air Peace from Nigeria on Arrival at Saudi Arabia',
  '6. Motion for Reversal of the $11 Billion Arbitration Award in Favour of P&ID Against Nigeria: Call for the Investigation of All Legal and Other Services Providers Involved in the P&ID Deal',
  '7. Motion for Urgent Need for the Settlement of Critical Judgment Debt Owed by Federal Government, Ministries, Departments and Agencies with Promissory Notes to Avoid Garnishee Orders on the Federal Government',
  '8. Motion for Urgent Need to Investigate the Distribution and Performance of Various Facilities of the Central Bank of Nigeria Dispensed Through NIRSAL Plc and the NIRSAL Micro Finance Bank',
  '9. Motion for Urgent Need to Investigate Under-Reporting of Wins (Extracted Products) by Mines and Quarry Licence Operators',
  '10. Motion for Urgent Need to Adjust the Nation’s Fiscal Policy to Reduce Import Tariff on Drugs and Raw Materials to Boost Domestic Production of Drugs and Medical Supplies to Save Lives',
  '11. Motion for Urgent Need to Revive the Federal Government Assisted Urban Mass Transit Scheme for Inter and Interstate Transport and the Urban Mass Transit Scheme for the Federal Capital Territory',
  '12. Motion for Urgent Need to Address the Rapid Depreciation and Free Fall of the Naira and the Dire Consequences on the Domestic Economy',
  '13. Motion on the Need for Central Bank of Nigeria (CBN) to Reverse the Implementation of the National Cybersecurity Fund',
];

const TABS = [
  { id: 'bills', label: `Bills (${BILLS.length})` },
  { id: 'motions', label: `Motions (${MOTIONS.length})` },
  { id: 'petitions', label: `Petitions (${PETITIONS.length})` },
  { id: 'all', label: 'All (24)' },
];

export default function CoreMandate() {
  const [tab, setTab] = useState('bills');

  const showBills = tab === 'all' || tab === 'bills';
  const showMotions = tab === 'all' || tab === 'motions';
  const showPetitions = tab === 'all' || tab === 'petitions';

  return (
    <section className="section" id="mandate">
      <div className="shell">
        <div className="mandate-head">
          <div>
            <p className="eyebrow">Core Mandate</p>
            <h2>Bills, Petitions &amp; Motions</h2>
            <p className="sec-sub">
              Legislative record of Hon. (Dr.) Kama Nkemkanma, FIMC, CMC at the House of
              Representatives.
            </p>
          </div>
          <div className="mandate-controls">
            <div className="mandate-tabs" role="tablist" aria-label="Core Mandate categories">
              {TABS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`tab-pill${tab === t.id ? ' is-active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mandate-list">
          {showBills &&
            BILLS.map(bill => (
              <article className="mandate-card" key={bill.title}>
                <span className="status-tag">Bill</span>
                <h4>{bill.title}</h4>
                <p>{bill.desc}</p>
                {bill.remark && <span className="status-tag">{bill.remark}</span>}
              </article>
            ))}

          {showPetitions &&
            PETITIONS.map(pet => (
              <article className="mandate-card" key={pet.title}>
                <span className="status-tag">Petition &bull; {pet.remark}</span>
                <h4>{pet.title}</h4>
                <p>{pet.desc}</p>
              </article>
            ))}

          {showMotions &&
            MOTIONS.map(motion => (
              <article className="mandate-card" key={motion}>
                <span className="status-tag">Motion</span>
                <h4>{motion}</h4>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
