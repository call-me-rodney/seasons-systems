// Seeds the running API with the demo data in seedData.js.
//
// Usage (from backend/):
//   SEED_TOKEN=<superAdmin JWT> node scripts/seed-api.js
// Optional: API_URL (default http://localhost:4000/api), --force to seed even if data exists.
//
// A superAdmin token is required: it bypasses the department/role checks on every route.
import * as data from './seedData.js';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';
const TOKEN = process.env.SEED_TOKEN;
const FORCE = process.argv.includes('--force');

if (!TOKEN) {
  console.error('Set SEED_TOKEN to a superAdmin JWT.');
  process.exit(1);
}

async function api(method, path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: body && JSON.stringify(body),
  });
  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status}: ${JSON.stringify(payload)}`);
  }
  return payload;
}

// Local key -> database ID, per entity type.
const ids = { employee: {}, field: {}, crop: {}, pen: {}, animal: {}, item: {}, supplier: {}, equipment: {} };

const create = async (path, idField, body) => (await api('POST', path, body))[idField];

async function seed() {
  if (!FORCE) {
    const existing = await api('GET', '/fields');
    if (existing.length) {
      console.error(`Database already has ${existing.length} field(s). Re-run with --force to seed anyway.`);
      process.exit(1);
    }
  }

  for (const { key, ...employee } of data.employees) {
    const res = await api('POST', '/super-admin', { ...employee, password: data.SEED_PASSWORD });
    ids.employee[key] = res.user.id;
  }
  console.log(`employees:   ${data.employees.length}`);

  for (const { key, ...field } of data.fields) {
    ids.field[key] = await create('/fields', 'fieldID', field);
  }
  for (const { key, field, ...crop } of data.crops) {
    ids.crop[key] = await create('/crops', 'cropID', { ...crop, fieldID: ids.field[field] });
  }
  console.log(`fields:      ${data.fields.length}, crops: ${data.crops.length}`);

  let animalCount = 0;
  for (const { key, animals, ...pen } of data.pens) {
    ids.pen[key] = await create('/pens', 'penID', pen);
    for (let i = 0; i < (animals?.count ?? 0); i += 1) {
      await create('/livestock', 'animalID', {
        species: animals.species,
        breed: animals.breed,
        acquisitionDate: '2026-03-01',
        penID: ids.pen[key],
        status: 'active',
      });
      animalCount += 1;
    }
  }
  for (const { key, pen, ...cow } of data.cattle) {
    ids.animal[key] = await create('/livestock', 'animalID', { ...cow, penID: ids.pen[pen] });
    animalCount += 1;
  }
  console.log(`pens:        ${data.pens.length}, livestock: ${animalCount}`);

  for (const { key, crop, animal, ...item } of data.inventory) {
    ids.item[key] = await create('/inventory', 'itemID', {
      ...item,
      cropID: crop ? ids.crop[crop] : null,
      animalID: animal ? ids.animal[animal] : null,
    });
  }
  console.log(`inventory:   ${data.inventory.length}`);

  for (const { item, quantitySold, unitPrice, paymentMethod, saleDate, seller } of data.sales) {
    const saleDetailsID = await create('/salesdetails', 'salesDetailsID', {
      item: ids.item[item], quantitySold, unitPrice, saleTotal: quantitySold * unitPrice, paymentMethod,
    });
    await create('/sales', 'saleID', { saleDetailsID, saleDate, employeeID: ids.employee[seller] });
  }
  console.log(`sales:       ${data.sales.length}`);

  for (const { key, ...supplier } of data.suppliers) {
    ids.supplier[key] = await create('/suppliers', 'supplierID', supplier);
  }
  for (const { key, supplier, holder, ...item } of data.equipment) {
    ids.equipment[key] = await create('/equipment', 'equipmentID', {
      ...item,
      supplierID: ids.supplier[supplier],
      employeeID: holder ? ids.employee[holder] : null,
    });
  }
  for (const { item, supplier, ...resupply } of data.resupplies) {
    await create('/resupplies', 'requestID', {
      ...resupply,
      item: ids.equipment[item],
      supplierID: ids.supplier[supplier],
      subtotal: resupply.quantity * resupply.unitPrice,
    });
  }
  console.log(`suppliers:   ${data.suppliers.length}, equipment: ${data.equipment.length}, resupplies: ${data.resupplies.length}`);
  console.log('Seeding complete.');
}

seed().catch((error) => {
  console.error(`Seeding failed: ${error.message}`);
  process.exit(1);
});
