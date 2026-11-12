// Demo data for Seasons Systems, seeded through the REST API by seed-api.js.
// Cross-references use local keys (e.g. field: 'cornA'); seed-api.js swaps
// them for the real database IDs as records are created.

// Shared login password for every seeded (non-superAdmin) account. Test data only.
export const SEED_PASSWORD = 'QxxAC6qeaaF5';

// ---------------------------------------------------------------- employees
// 29 staff. Finance (2) is skipped: 'finance' is not in the department enum.
// Field staff: two halves of 10, each led by an admin in the 'field' department.
const person = (key, name, department, role, dateOfHire, contact) =>
  ({ key, name, department, role, dateOfHire, contact });

export const employees = [
  // Field: crop half (1 field admin + 9 crop users)
  person('cropLead',  'Grace Namutebi',   'field',     'admin', '2021-02-01', '0772100101'),
  person('crop1',     'Peter Okello',     'crop',      'user',  '2022-03-14', '0772100102'),
  person('crop2',     'Sarah Akello',     'crop',      'user',  '2022-03-14', '0772100103'),
  person('crop3',     'Moses Kato',       'crop',      'user',  '2022-06-01', '0772100104'),
  person('crop4',     'Ruth Nakato',      'crop',      'user',  '2023-01-09', '0772100105'),
  person('crop5',     'Isaac Mugisha',    'crop',      'user',  '2023-01-09', '0772100106'),
  person('crop6',     'Esther Atim',      'crop',      'user',  '2023-08-21', '0772100107'),
  person('crop7',     'Joseph Ssempala',  'crop',      'user',  '2024-02-05', '0772100108'),
  person('crop8',     'Agnes Nabirye',    'crop',      'user',  '2024-07-15', '0772100109'),
  person('crop9',     'Daniel Opio',      'crop',      'user',  '2025-03-03', '0772100110'),
  // Field: livestock half (1 field admin + 9 livestock users)
  person('stockLead', 'Robert Byaruhanga','field',     'admin', '2021-02-01', '0772100201'),
  person('stock1',    'Florence Achieng', 'livestock', 'user',  '2022-04-11', '0772100202'),
  person('stock2',    'Samuel Wasswa',    'livestock', 'user',  '2022-04-11', '0772100203'),
  person('stock3',    'Mary Nansubuga',   'livestock', 'user',  '2022-09-19', '0772100204'),
  person('stock4',    'Charles Ouma',     'livestock', 'user',  '2023-02-27', '0772100205'),
  person('stock5',    'Juliet Kyomuhendo','livestock', 'user',  '2023-05-08', '0772100206'),
  person('stock6',    'Patrick Lubega',   'livestock', 'user',  '2023-11-13', '0772100207'),
  person('stock7',    'Brenda Auma',      'livestock', 'user',  '2024-04-22', '0772100208'),
  person('stock8',    'Henry Tumusiime',  'livestock', 'user',  '2024-10-01', '0772100209'),
  person('stock9',    'Lydia Nambi',      'livestock', 'user',  '2025-05-12', '0772100210'),
  // Inventory
  person('invAdmin',  'Andrew Mukasa',    'inventory', 'admin', '2021-06-07', '0772100301'),
  person('inv1',      'Doreen Apio',      'inventory', 'user',  '2023-07-03', '0772100302'),
  // Sales
  person('salesAdmin','Victor Kiggundu',  'sales',     'admin', '2021-09-13', '0772100401'),
  person('sales1',    'Irene Nalwoga',    'sales',     'user',  '2024-01-15', '0772100402'),
  // HR
  person('hrAdmin',   'Catherine Ayebare','HR',        'admin', '2020-11-02', '0772100501'),
  person('hr1',       'Martin Ojok',      'HR',        'user',  '2022-08-08', '0772100502'),
  person('hr2',       'Winnie Namubiru',  'HR',        'user',  '2024-06-17', '0772100503'),
  // Procurement (single member, so they are the admin)
  person('procAdmin', 'Emmanuel Tusiime', 'procurement','admin','2021-04-19', '0772100601'),
  // Equipment (single member, so they are the admin)
  person('equipAdmin','Simon Ochieng',    'equipment', 'admin', '2022-01-24', '0772100701'),
];

// ---------------------------------------------------------------- fields & crops
// 3 acres of corn (1 acre harvested last month + 2 acres growing) and 2 acres of tea.
export const fields = [
  { key: 'cornA', name: 'Corn Field A', location: 'North block', size: 1, soilType: 'Loam',      lastFertilizedDate: '2026-06-02' },
  { key: 'cornB', name: 'Corn Field B', location: 'North block', size: 2, soilType: 'Loam',      lastFertilizedDate: '2026-08-10' },
  { key: 'tea',   name: 'Tea Garden',   location: 'East slope',  size: 2, soilType: 'Clay loam', lastFertilizedDate: '2026-07-18' },
];

export const crops = [
  { key: 'cornHarvested', field: 'cornA', type: 'Corn', plantingDate: '2026-05-04', expectedHarvestDate: '2026-09-07',
    actualHarvestDate: '2026-09-12', yieldQuantity: 80, yieldUnit: 'bags', status: 'harvested' },
  { key: 'cornGrowing',   field: 'cornB', type: 'Corn', plantingDate: '2026-07-27', expectedHarvestDate: '2026-11-25', status: 'growing' },
  { key: 'teaGrowing',    field: 'tea',   type: 'Tea',  plantingDate: '2023-03-15', expectedHarvestDate: '2026-10-20', status: 'growing' },
];

// ---------------------------------------------------------------- pens & livestock
// Livestock.penID is required, so the 8 cattle (all sold or slaughtered) are
// recorded against a cattle kraal that is now empty.
export const pens = [
  { key: 'sty1',  name: 'Pig Sty 1',    location: 'South yard', type: 'pig sty',      capacity: 10, lastCleanedDate: '2026-10-05', isFull: true,  animals: { count: 10, species: 'Pig', breed: 'Large White' } },
  { key: 'sty2',  name: 'Pig Sty 2',    location: 'South yard', type: 'pig sty',      capacity: 10, lastCleanedDate: '2026-10-05', isFull: true,  animals: { count: 10, species: 'Pig', breed: 'Landrace' } },
  { key: 'sty3',  name: 'Pig Sty 3',    location: 'South yard', type: 'pig sty',      capacity: 10, lastCleanedDate: '2026-10-06', isFull: false, animals: { count: 6,  species: 'Pig', breed: 'Large White' } },
  { key: 'coop',  name: 'Chicken Coop', location: 'West yard',  type: 'chicken coop', capacity: 40, lastCleanedDate: '2026-10-07', isFull: true,  animals: { count: 40, species: 'Chicken', breed: 'Kuroiler' } },
  { key: 'kraal', name: 'Cattle Kraal', location: 'Back paddock', type: 'kraal',      capacity: 10, lastCleanedDate: '2026-09-20', isFull: false },
];

// Cattle: 4 sold live, 4 slaughtered (status 'dead') for meat.
export const cattle = [
  ...[1, 2, 3, 4].map((n) => ({ key: `soldCow${n}`, pen: 'kraal', species: 'Cow', breed: 'Ankole', status: 'sold',
    birthDate: '2022-02-10', acquisitionDate: '2023-01-15' })),
  ...[1, 2, 3, 4].map((n) => ({ key: `beefCow${n}`, pen: 'kraal', species: 'Cow', breed: 'Boran', status: 'dead',
    birthDate: '2022-05-20', acquisitionDate: '2023-01-15' })),
];

// ---------------------------------------------------------------- inventory
// Quantities are what remains after the sales below:
// 80 bags harvested - 1 sold = 79; beef from cow 1: 180 kg - 15 kg sold = 165.
export const inventory = [
  { key: 'cornBags', name: 'Dried corn (100 kg bags)', type: 'crop_produce', crop: 'cornHarvested',
    quantity: 79, units: 'bags', pricePerUnit: 110000, expiryDate: '2027-09-12' },
  ...[1, 2, 3, 4].map((n) => ({ key: `beef${n}`, name: `Beef - carcass ${n}`, type: 'meat_produce', animal: `beefCow${n}`,
    quantity: n === 1 ? 165 : 180, units: 'kg', pricePerUnit: 15000, expiryDate: '2027-03-15' })),
];

// ---------------------------------------------------------------- sales
export const sales = [
  { item: 'cornBags', quantitySold: 1,  unitPrice: 110000, paymentMethod: 'cash',         saleDate: '2026-09-20', seller: 'sales1' },
  { item: 'beef1',    quantitySold: 15, unitPrice: 15000,  paymentMethod: 'mobile money', saleDate: '2026-09-28', seller: 'salesAdmin' },
];

// ---------------------------------------------------------------- suppliers, equipment, resupply
export const suppliers = [
  { key: 'tools1', name: 'Greenline Agro Tools',     contacts: '0414200301', address: 'Plot 12, Industrial Area', specialty: 'Farm tools' },
  { key: 'tools2', name: 'Harvest Hardware Supplies', contacts: '0414200302', address: 'Plot 4, Market Street',    specialty: 'Farm tools and implements' },
  { key: 'isp',    name: 'FarmLink Broadband',       contacts: '0414200303', address: 'Plot 30, Tech Park',       specialty: 'Internet service provider' },
];

export const equipment = [
  { key: 'hoes',     name: 'Hand hoe',          model: 'Forged steel 2.5 lb', purchaseDate: '2026-08-05', status: 'new',       supplier: 'tools1', isInUse: true,  holder: 'equipAdmin' },
  { key: 'sprayer',  name: 'Knapsack sprayer',  model: '16 L manual',         purchaseDate: '2025-02-11', status: 'worn out',  supplier: 'tools2', isInUse: true,  holder: 'equipAdmin' },
  { key: 'barrow',   name: 'Wheelbarrow',       model: 'Heavy duty 90 L',     purchaseDate: '2025-06-30', status: 'new',       supplier: 'tools1', isInUse: false },
  { key: 'pump',     name: 'Water pump',        model: '2-inch petrol',       purchaseDate: '2024-09-14', status: 'damaged',   supplier: 'tools2', isInUse: false },
  { key: 'router',   name: 'Wi-Fi router',      model: 'Dual-band AC1200',    purchaseDate: '2025-01-20', status: 'new',       supplier: 'isp',    isInUse: true,  holder: 'equipAdmin' },
];

// deliveryDate null = pending
export const resupplies = [
  { item: 'hoes',    supplier: 'tools1', requestDate: '2026-07-28', quantity: 10, unitPrice: 25000,  deliveryDate: '2026-08-05', invoiceNo: 'GAT-2026-0815' },
  { item: 'sprayer', supplier: 'tools2', requestDate: '2026-10-02', quantity: 2,  unitPrice: 180000, deliveryDate: null,         invoiceNo: null },
];
