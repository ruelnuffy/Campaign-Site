import { LGA_COMMUNITIES, normalizePhone } from './supporterStore';

const EVENT_STORAGE_KEY = 'hipe_event_registrations';

export const UPCOMING_EVENTS = [
  {
    id: 'carol',
    title: 'Ohanivo Christmas Carol',
    tag: 'Community Celebration',
    desc: 'Annual constituency-wide Christmas carol, praise, and fellowship bringing together families across Ohaozara, Onicha, and Ivo.',
  },
  {
    id: 'unity-cup',
    title: 'Ohanivo Unity Cup Tournament',
    tag: 'Youth & Sports',
    desc: 'Inter-community football tournament uniting youths and discovering talent across all wards in Ohanivo.',
  },
  {
    id: 'unity-carnival',
    title: 'Ohanivo Unity Carnival',
    tag: 'Culture & Heritage',
    desc: 'Cultural showcase celebrating the rich traditions, music, and unity of Ohaozara, Onicha, and Ivo.',
  },
  {
    id: 'medical-outreach',
    title: 'Ohanivo Medical & Surgical Outreaches',
    tag: 'HIPE Health Pillar',
    desc: 'Free medical consultations, screenings, surgeries, and essential medications for constituents across all three LGAs.',
  },
];

function loadEventRegistrations() {
  try {
    const raw = localStorage.getItem(EVENT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function registerForEvent({ eventTitle, name, phone, email, lga, community }) {
  const cleanEvent = String(eventTitle || '').trim();
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanLga = String(lga || '').trim();
  const cleanCommunity = String(community || '').trim();
  const errors = [];

  if (!UPCOMING_EVENTS.some(ev => ev.title === cleanEvent)) {
    errors.push('Select an upcoming event.');
  }
  if (!/^[\p{L}\p{M}][\p{L}\p{M} .’'\-]{1,79}$/u.test(cleanName)) {
    errors.push('Enter your full name (2–80 letters).');
  }
  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone) {
    errors.push('Enter a valid Nigerian phone number, e.g. 0701 708 9013.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errors.push('Enter a valid email address.');
  }
  const validCommunities = LGA_COMMUNITIES[cleanLga] || [];
  if (!validCommunities.includes(cleanCommunity)) {
    errors.push('Choose your LGA and Community.');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const all = loadEventRegistrations();
  const existing = all.find(
    r => r.event_title === cleanEvent && r.phone === normalizedPhone,
  );
  if (existing) {
    return { ok: true, registration: existing, duplicate: true };
  }

  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

  const registration = {
    reg_id: `EVT-${code}`,
    event_title: cleanEvent,
    full_name: cleanName,
    phone: normalizedPhone,
    email: cleanEmail,
    lga: cleanLga,
    community: cleanCommunity,
    created_at: new Date().toISOString(),
  };

  all.push(registration);
  localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(all));
  return { ok: true, registration };
}
