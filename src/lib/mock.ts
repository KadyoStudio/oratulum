// Seeded demo data for Ora Tulum — realistic, not wired to a DB.
// 6 Jungle Villas + 9 King Suites = 15 rooms, up to 32 guests.

export const KPIS = {
  revenueToday: 14200,
  revenueMonth: 186500,
  revenueMonthGoal: 240000,
  occupancyRooms: 11,
  occupancyTotal: 15,
  outstanding: 32400,
  newInquiries: 18,
  whatsappToday: 42,
  bookingsToday: 3,
  aiResolvedPct: 88,
};

// Last 7 days revenue (USD), for the trend bars.
export const REVENUE_7D = [
  { day: "Sat", value: 9200 },
  { day: "Sun", value: 6100 },
  { day: "Mon", value: 12400 },
  { day: "Tue", value: 8800 },
  { day: "Wed", value: 15600 },
  { day: "Thu", value: 11200 },
  { day: "Fri", value: 14200 },
];

export const THIS_WEEK_RETREAT = {
  label: "Jul 29 — Aug 2",
  guests: 24,
  rooms: 11,
  ceremonies: [
    { name: "Ayahuasca", day: "Thu" },
    { name: "Bufo Alvarius", day: "Sat" },
  ],
};

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Application"
  | "Deposit"
  | "Confirmed";

export const STATUS_META: Record<LeadStatus, { label: string; tone: string }> = {
  New: { label: "New inquiry", tone: "clay" },
  Contacted: { label: "Contacted", tone: "gold" },
  Application: { label: "Application", tone: "gold" },
  Deposit: { label: "Deposit due", tone: "clay" },
  Confirmed: { label: "Confirmed", tone: "jungle" },
};

export type Lead = {
  id: string;
  name: string;
  country: string;
  month: string;
  group: number;
  ceremony: string;
  status: LeadStatus;
  value: number;
  source: string;
  agoMin: number;
};

export const LEADS: Lead[] = [
  { id: "l1", name: "Amara Whitfield", country: "US", month: "September", group: 2, ceremony: "Ayahuasca", status: "New", value: 9800, source: "Website form", agoMin: 12 },
  { id: "l2", name: "Lucas Fenn", country: "UK", month: "October", group: 1, ceremony: "Psilocybin", status: "Deposit", value: 5200, source: "WhatsApp", agoMin: 47 },
  { id: "l3", name: "Sofía Marchetti", country: "MX", month: "September", group: 4, ceremony: "Bufo Alvarius", status: "Application", value: 18600, source: "Instagram", agoMin: 92 },
  { id: "l4", name: "Daniel Okoro", country: "US", month: "November", group: 2, ceremony: "Peyote", status: "New", value: 10400, source: "Website form", agoMin: 140 },
  { id: "l5", name: "Elise Vandermeer", country: "NL", month: "September", group: 3, ceremony: "Ayahuasca", status: "Confirmed", value: 14100, source: "Referral", agoMin: 210 },
  { id: "l6", name: "Marcus Reed", country: "CA", month: "December", group: 5, ceremony: "Psilocybin", status: "Contacted", value: 22500, source: "WhatsApp", agoMin: 320 },
  { id: "l7", name: "Hannah Berg", country: "DE", month: "October", group: 2, ceremony: "Ayahuasca", status: "Contacted", value: 6400, source: "Website form", agoMin: 380 },
  { id: "l8", name: "Tomás Rivera", country: "MX", month: "September", group: 2, ceremony: "Psilocybin", status: "New", value: 8900, source: "Instagram", agoMin: 22 },
  { id: "l9", name: "Grace Liu", country: "US", month: "November", group: 3, ceremony: "Bufo Alvarius", status: "Confirmed", value: 15200, source: "Referral", agoMin: 500 },
  { id: "l10", name: "Owen Clarke", country: "AU", month: "December", group: 1, ceremony: "Peyote", status: "Application", value: 5600, source: "WhatsApp", agoMin: 160 },
  { id: "l11", name: "Nadia Haddad", country: "FR", month: "October", group: 4, ceremony: "Ayahuasca", status: "Deposit", value: 18800, source: "Website form", agoMin: 240 },
  { id: "l12", name: "Peter Soto", country: "US", month: "September", group: 2, ceremony: "Psilocybin", status: "Contacted", value: 9200, source: "WhatsApp", agoMin: 75 },
  { id: "l13", name: "Isabella Moretti", country: "IT", month: "November", group: 2, ceremony: "Ayahuasca", status: "New", value: 9600, source: "Instagram", agoMin: 33 },
  { id: "l14", name: "James Whitaker", country: "US", month: "December", group: 5, ceremony: "Bufo Alvarius", status: "Application", value: 23400, source: "Referral", agoMin: 410 },
  { id: "l15", name: "Yuki Tanaka", country: "JP", month: "October", group: 1, ceremony: "Psilocybin", status: "Confirmed", value: 5100, source: "Website form", agoMin: 600 },
  { id: "l16", name: "Rosa Delgado", country: "MX", month: "September", group: 3, ceremony: "Peyote", status: "Deposit", value: 13900, source: "WhatsApp", agoMin: 130 },
];

export const PIPELINE_ORDER: LeadStatus[] = [
  "New",
  "Contacted",
  "Application",
  "Deposit",
  "Confirmed",
];

// Warm → green progression: earlier stages are clay/gold, won stages turn green.
export const STAGE_COLOR: Record<LeadStatus, string> = {
  New: "#c06b3e",
  Contacted: "#d98b5f",
  Application: "#b79a4e",
  Deposit: "#4a7e6e",
  Confirmed: "#2f5d50",
};

export type AiThread = {
  id: string;
  name: string;
  channel: "WhatsApp" | "Email";
  snippet: string;
  status: "AI resolved" | "Needs human" | "Following up";
  agoMin: number;
};

export const CONCIERGE_STATS = {
  today: 42,
  autoResolved: 88,
  avgResponse: "8s",
  needsHuman: 2,
};

export type ChatMsg = { from: "guest" | "ai" | "staff"; text: string; t: string };

export type Conversation = {
  id: string;
  name: string;
  country: string;
  channel: "WhatsApp" | "Email";
  status: "AI resolved" | "Needs human" | "Following up";
  lang: "EN" | "ES";
  agoMin: number;
  messages: ChatMsg[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Amara Whitfield",
    country: "US",
    channel: "WhatsApp",
    status: "AI resolved",
    lang: "EN",
    agoMin: 8,
    messages: [
      { from: "guest", text: "Hi! What's included in the all-inclusive rate?", t: "09:12" },
      { from: "ai", text: "Hi Amara! Your stay includes all meals, spa treatments, wellness sessions, and round-trip private airport transfers. Everything is taken care of from the moment you land. 🌿", t: "09:12" },
      { from: "guest", text: "Perfect. And is it 5 days?", t: "09:14" },
      { from: "ai", text: "Yes — each retreat runs 5 days / 4 nights, Wednesday to Sunday. Would you like me to check availability for September?", t: "09:14" },
      { from: "guest", text: "Yes please!", t: "09:15" },
    ],
  },
  {
    id: "c2",
    name: "Priya Nair",
    country: "IN",
    channel: "Email",
    status: "AI resolved",
    lang: "EN",
    agoMin: 26,
    messages: [
      { from: "guest", text: "Can we book the airport transfer for a group of 4?", t: "08:40" },
      { from: "ai", text: "Absolutely, Priya. Round-trip private transfers for all 4 guests are already included in your package — no extra cost. Just share your flight details and we'll arrange the pickup.", t: "08:41" },
    ],
  },
  {
    id: "c3",
    name: "Sofía Marchetti",
    country: "MX",
    channel: "WhatsApp",
    status: "Needs human",
    lang: "ES",
    agoMin: 33,
    messages: [
      { from: "guest", text: "Tengo alergia a los frutos secos, ¿lo pueden manejar?", t: "08:20" },
      { from: "ai", text: "Gracias por avisarnos, Sofía. Las alergias son muy importantes para nosotros. Voy a pasar tu caso directamente al equipo de cocina para confirmar cada detalle de tu estancia.", t: "08:20" },
      { from: "staff", text: "Flagged to kitchen — awaiting confirmation before reply.", t: "08:21" },
    ],
  },
  {
    id: "c4",
    name: "Marcus Reed",
    country: "CA",
    channel: "WhatsApp",
    status: "Following up",
    lang: "EN",
    agoMin: 51,
    messages: [
      { from: "guest", text: "Do you have space the last week of December?", t: "07:55" },
      { from: "ai", text: "Let me check for you, Marcus. The Dec 24–28 retreat has 3 rooms left. Shall I hold one while you decide? A 50% deposit secures it.", t: "07:56" },
      { from: "ai", text: "Just following up 🌙 — those rooms tend to go quickly this time of year. Want me to send you the booking link?", t: "10:30" },
    ],
  },
  {
    id: "c5",
    name: "Elise Vandermeer",
    country: "NL",
    channel: "WhatsApp",
    status: "AI resolved",
    lang: "EN",
    agoMin: 88,
    messages: [
      { from: "guest", text: "What time is check-in on Wednesday?", t: "06:40" },
      { from: "ai", text: "Check-in opens at 3:00 PM on Wednesday, but you're welcome to arrive earlier to settle in. Your private transfer will be timed to your flight. See you soon, Elise! ✨", t: "06:40" },
    ],
  },
  {
    id: "c6",
    name: "Daniel Okoro",
    country: "US",
    channel: "WhatsApp",
    status: "Needs human",
    lang: "EN",
    agoMin: 120,
    messages: [
      { from: "guest", text: "Can you tell me more about the ceremonies?", t: "05:30" },
      { from: "ai", text: "That's something our facilitators guide personally, so I'll connect you with our team who can walk you through it properly and answer everything with care. May I pass your inquiry to them?", t: "05:30" },
      { from: "guest", text: "Yes, thank you.", t: "05:32" },
      { from: "staff", text: "Guardrail triggered — handed to facilitator team.", t: "05:33" },
    ],
  },
];

export const AI_THREADS: AiThread[] = [
  { id: "t1", name: "Amara Whitfield", channel: "WhatsApp", snippet: "What's included in the all-inclusive rate?", status: "AI resolved", agoMin: 8 },
  { id: "t2", name: "Priya Nair", channel: "Email", snippet: "Can we book the airport transfer for 4?", status: "AI resolved", agoMin: 26 },
  { id: "t3", name: "Sofía Marchetti", channel: "WhatsApp", snippet: "I have a nut allergy — is that handled?", status: "Needs human", agoMin: 33 },
  { id: "t4", name: "Marcus Reed", channel: "WhatsApp", snippet: "Do you have space the last week of December?", status: "Following up", agoMin: 51 },
];

export type RoomStatus = "Occupied" | "Available" | "Arriving";
export type Room = {
  id: string;
  name: string;
  type: "Villa" | "Suite";
  guest?: string;
  guests?: number;
  status: RoomStatus;
};

export const ROOMS: Room[] = [
  { id: "v1", name: "Jungle Villa 1", type: "Villa", guest: "Elise Vandermeer", guests: 3, status: "Occupied" },
  { id: "v2", name: "Jungle Villa 2", type: "Villa", guest: "Marcus Reed", guests: 2, status: "Occupied" },
  { id: "v3", name: "Jungle Villa 3", type: "Villa", guest: "Grace Liu", guests: 3, status: "Occupied" },
  { id: "v4", name: "Jungle Villa 4", type: "Villa", guest: "James Whitaker", guests: 2, status: "Occupied" },
  { id: "v5", name: "Jungle Villa 5", type: "Villa", guest: "Nadia Haddad", guests: 4, status: "Occupied" },
  { id: "v6", name: "Jungle Villa 6", type: "Villa", status: "Available" },
  { id: "s1", name: "King Suite 1", type: "Suite", guest: "Amara Whitfield", guests: 2, status: "Occupied" },
  { id: "s2", name: "King Suite 2", type: "Suite", guest: "Yuki Tanaka", guests: 1, status: "Occupied" },
  { id: "s3", name: "King Suite 3", type: "Suite", guest: "Peter Soto", guests: 2, status: "Occupied" },
  { id: "s4", name: "King Suite 4", type: "Suite", guest: "Rosa Delgado", guests: 2, status: "Occupied" },
  { id: "s5", name: "King Suite 5", type: "Suite", guest: "Owen Clarke", guests: 1, status: "Arriving" },
  { id: "s6", name: "King Suite 6", type: "Suite", guest: "Isabella Moretti", guests: 2, status: "Occupied" },
  { id: "s7", name: "King Suite 7", type: "Suite", status: "Available" },
  { id: "s8", name: "King Suite 8", type: "Suite", status: "Available" },
  { id: "s9", name: "King Suite 9", type: "Suite", status: "Available" },
];

export type Retreat = {
  id: string;
  label: string;
  guests: number;
  rooms: number;
  ceremonies: string[];
  state: "In progress" | "Filling" | "Open";
};

export const UPCOMING_RETREATS: Retreat[] = [
  { id: "r1", label: "Jul 29 — Aug 2", guests: 24, rooms: 11, ceremonies: ["Ayahuasca", "Bufo Alvarius"], state: "In progress" },
  { id: "r2", label: "Aug 5 — Aug 9", guests: 18, rooms: 9, ceremonies: ["Ayahuasca", "Psilocybin"], state: "Filling" },
  { id: "r3", label: "Aug 12 — Aug 16", guests: 26, rooms: 13, ceremonies: ["Peyote", "Bufo Alvarius"], state: "Filling" },
  { id: "r4", label: "Aug 19 — Aug 23", guests: 14, rooms: 8, ceremonies: ["Ayahuasca"], state: "Open" },
  { id: "r5", label: "Aug 26 — Aug 30", guests: 30, rooms: 14, ceremonies: ["Bufo Alvarius", "Psilocybin"], state: "Filling" },
];

/* ---------- STAFF ---------- */
export type Arrival = { guest: string; room: string; pax: number; time: string; flight: string };
export const ARRIVALS: Arrival[] = [
  { guest: "Owen Clarke", room: "King Suite 5", pax: 1, time: "14:20", flight: "AA 1183" },
  { guest: "Herrera group", room: "Jungle Villa 6", pax: 4, time: "16:05", flight: "UA 992" },
  { guest: "Léa Fontaine", room: "King Suite 7", pax: 2, time: "18:40", flight: "AF 178" },
];

export type Departure = { guest: string; room: string; pax: number; time: string };
export const DEPARTURES: Departure[] = [
  { guest: "Yuki Tanaka", room: "King Suite 2", pax: 1, time: "09:30" },
  { guest: "Grace Liu", room: "Jungle Villa 3", pax: 3, time: "11:00" },
];

export type Housekeep = { room: string; status: "Clean" | "In progress" | "Pending" };
export const HOUSEKEEPING: Housekeep[] = [
  { room: "King Suite 2", status: "In progress" },
  { room: "Jungle Villa 3", status: "Pending" },
  { room: "King Suite 5", status: "Clean" },
  { room: "Jungle Villa 6", status: "Clean" },
  { room: "King Suite 7", status: "In progress" },
];

export type Dietary = { guest: string; note: string; severity: "high" | "normal" };
export const DIETARY: Dietary[] = [
  { guest: "Sofía Marchetti", note: "Severe nut allergy", severity: "high" },
  { guest: "James Whitaker", note: "Vegan", severity: "normal" },
  { guest: "Nadia Haddad", note: "Gluten-free", severity: "normal" },
];

export type Transfer = { time: string; guest: string; dir: "Pickup" | "Drop-off"; place: string };
export const TRANSPORT: Transfer[] = [
  { time: "09:00", guest: "Yuki Tanaka", dir: "Drop-off", place: "CUN Airport" },
  { time: "14:20", guest: "Owen Clarke", dir: "Pickup", place: "CUN Airport" },
  { time: "16:05", guest: "Herrera group", dir: "Pickup", place: "CUN Airport" },
];

export type CeremonySlot = { day: string; name: string; time: string; guests: number };
export const CEREMONY_SCHEDULE: CeremonySlot[] = [
  { day: "Thu", name: "Ayahuasca", time: "20:00", guests: 18 },
  { day: "Sat", name: "Bufo Alvarius", time: "08:00", guests: 12 },
];

export type Maintenance = { item: string; room: string; priority: "High" | "Medium" | "Low"; status: "Open" | "Scheduled" };
export const MAINTENANCE: Maintenance[] = [
  { item: "A/C not cooling", room: "Jungle Villa 3", priority: "High", status: "Open" },
  { item: "Plunge pool pump check", room: "Jungle Villa 5", priority: "Medium", status: "Scheduled" },
  { item: "Replace terrace bulb", room: "King Suite 6", priority: "Low", status: "Open" },
];

/* ---------- PAYMENTS ---------- */
export const PAY_SUMMARY = {
  collectedMonth: 186500,
  outstanding: 32400,
  depositsPending: 18700,
  overdue: 5200,
};

export type PayStatus = "Paid" | "Pending" | "Overdue";
export type Installment = {
  id: string;
  guest: string;
  kind: "Deposit 50%" | "Balance" | "Full payment";
  amount: number;
  due: string;
  status: PayStatus;
  method: "Bank transfer" | "Card" | "Crypto";
};

export const INSTALLMENTS: Installment[] = [
  { id: "p1", guest: "Elise Vandermeer", kind: "Balance", amount: 7050, due: "Aug 1", status: "Paid", method: "Bank transfer" },
  { id: "p2", guest: "Grace Liu", kind: "Balance", amount: 7600, due: "Aug 1", status: "Paid", method: "Card" },
  { id: "p3", guest: "Nadia Haddad", kind: "Deposit 50%", amount: 9400, due: "Aug 3", status: "Pending", method: "Bank transfer" },
  { id: "p4", guest: "Lucas Fenn", kind: "Deposit 50%", amount: 2600, due: "Aug 4", status: "Pending", method: "Card" },
  { id: "p5", guest: "Rosa Delgado", kind: "Deposit 50%", amount: 6950, due: "Jul 28", status: "Overdue", method: "Bank transfer" },
  { id: "p6", guest: "Yuki Tanaka", kind: "Full payment", amount: 5100, due: "Jul 20", status: "Paid", method: "Crypto" },
  { id: "p7", guest: "James Whitaker", kind: "Balance", amount: 11700, due: "Aug 8", status: "Pending", method: "Bank transfer" },
  { id: "p8", guest: "Marcus Reed", kind: "Deposit 50%", amount: 11250, due: "Aug 10", status: "Pending", method: "Card" },
];
