const STORAGE_KEY = 'hipe_agenda_volunteers';

const LGA_COMMUNITIES = {
  Ohaozara: ['Ugwulangwu', 'Okposi', 'Uburu'],
  Onicha: ['Onicha Igboeze', 'Isuokoma', 'Oshiri', 'Ukawu', 'Abaomege'],
  Ivo: ['Ishiagu', 'Akaeze'],
};

export { LGA_COMMUNITIES };

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAll(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function normalizePhone(raw) {
  let digits = String(raw || '').replace(/\D+/g, '');
  if (digits.length === 13 && digits.startsWith('234')) {
    digits = '0' + digits.slice(3);
  } else if (digits.length === 10 && !digits.startsWith('0')) {
    digits = '0' + digits;
  }
  return /^0[789][01]\d{8}$/.test(digits) ? digits : '';
}

function generateCardNumber() {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `HIPE-${hex}`;
}

export function registerSupporter({ name, phone, email, lga, community, ward, pollingUnit }, wardsMap) {
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanLga = String(lga || '').trim();
  const cleanCommunity = String(community || '').trim();
  const cleanWard = String(ward || '').trim();
  const cleanPu = String(pollingUnit || '').trim();
  const errors = [];

  if (!/^[\p{L}\p{M}][\p{L}\p{M} .’'\-]{1,79}$/u.test(cleanName)) {
    errors.push('Enter your full name (2–80 letters).');
  }

  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone) {
    errors.push('Enter a valid Nigerian phone number, e.g. 080 0000 0000.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errors.push('Enter a valid email address.');
  }

  const validCommunities = LGA_COMMUNITIES[cleanLga] || [];
  if (!validCommunities.includes(cleanCommunity)) {
    errors.push('Choose your Local Government Area and Community.');
  }

  const validWards = wardsMap?.[cleanLga];
  if (!Array.isArray(validWards) || !validWards.includes(cleanWard)) {
    errors.push('Choose your INEC Ward.');
  }

  if (cleanPu.length < 2 || cleanPu.length > 80) {
    errors.push('Enter your Polling Unit (PU).');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const records = loadAll();
  const existing = records.find(r => r.phone === normalizedPhone);
  if (existing) {
    return { ok: true, supporter: existing };
  }

  const supporter = {
    card_number: generateCardNumber(),
    full_name: cleanName,
    phone: normalizedPhone,
    email: cleanEmail,
    lga: cleanLga,
    community: cleanCommunity,
    ward: cleanWard,
    polling_unit: cleanPu,
    created_at: new Date().toISOString(),
  };

  records.push(supporter);
  saveAll(records);

  return { ok: true, supporter };
}

export function findSupporter(identifier) {
  const query = String(identifier || '').trim();
  if (!query) {
    return { ok: false, errors: ['Enter your Volunteer Card ID (e.g. HIPE-...) or phone number.'] };
  }

  const records = loadAll();
  const normalizedPhone = normalizePhone(query);

  const match = normalizedPhone
    ? records.find(r => r.phone === normalizedPhone)
    : records.find(r => String(r.card_number || '').toUpperCase() === query.toUpperCase());

  if (!match) {
    return { ok: false, errors: ['No HIPE-Agenda Volunteer card matched that Card ID or phone number.'] };
  }

  return { ok: true, supporter: match };
}
