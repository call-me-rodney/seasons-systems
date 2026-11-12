// Database-backed tests. They run against the local test database chosen in
// test/setup.js, create their own rows, and delete them again afterwards.
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import app from '../app.js';
import configs from '../configs/configs.js';
import { sequelize, Employee, Field, Crop } from '../models/index.js';
import * as employeeService from '../services/employeeService.js';

// Every row these tests create carries this prefix, so cleanup can find it.
const PREFIX = `test-${Date.now()}-`;
const PASSWORD = 'Baseline-pass-1';

const tokenFor = (payload) =>
  jwt.sign(payload, configs.auth.jwtSecret, { expiresIn: '5m' });

const hrAdmin = tokenFor({ id: 0, role: 'admin', department: 'HR' });
const superAdmin = tokenFor({ id: 0, role: 'superAdmin', department: 'administration' });
const cropUser = tokenFor({ id: 0, role: 'user', department: 'crop' });
const cropAdmin = tokenFor({ id: 0, role: 'admin', department: 'crop' });

const as = (token) => ({ Authorization: `Bearer ${token}` });

const newEmployee = (suffix, overrides = {}) => ({
  name: `${PREFIX}${suffix}`,
  password: PASSWORD,
  role: 'user',
  department: 'crop',
  dateOfHire: '2026-01-15',
  contact: '0700000000',
  ...overrides,
});

let field;

before(async () => {
  await sequelize.authenticate();
  await sequelize.sync(); // creates missing tables; never drops or alters
  field = await Field.create({ name: `${PREFIX}field`, location: 'Test plot' });
});

after(async () => {
  await Crop.destroy({ where: { fieldID: field.fieldID } });
  await Field.destroy({ where: { name: { [Op.like]: `${PREFIX}%` } } });
  await Employee.destroy({ where: { name: { [Op.like]: `${PREFIX}%` } } });
  await sequelize.close();
});

describe('POST /api/auth/login', () => {
  before(async () => {
    await employeeService.create(newEmployee('login', { role: 'admin', department: 'HR' }));
  });

  test('returns a token and the public user for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: `${PREFIX}login`, password: PASSWORD });

    assert.equal(res.status, 200);
    assert.equal(res.body.user.name, `${PREFIX}login`);
    assert.equal(res.body.user.role, 'admin');
    assert.equal(res.body.user.department, 'HR');
    assert.equal(res.body.user.password, undefined);

    const payload = jwt.verify(res.body.token, configs.auth.jwtSecret);
    assert.equal(payload.id, res.body.user.id);
    assert.equal(payload.role, 'admin');
    assert.equal(payload.department, 'HR');
  });

  test('rejects a wrong password with 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: `${PREFIX}login`, password: 'not-the-password' });
    assert.equal(res.status, 401);
    assert.equal(res.body.token, undefined);
  });

  test('rejects an unknown user with 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: `${PREFIX}nobody`, password: PASSWORD });
    assert.equal(res.status, 401);
    assert.equal(res.body.token, undefined);
  });

  test('the issued token is accepted by a protected route', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ name: `${PREFIX}login`, password: PASSWORD });
    const res = await request(app).get('/api/employees').set(as(login.body.token));
    assert.equal(res.status, 200);
  });
});

describe('/api/employees (HR admin)', () => {
  let id;

  test('POST creates an employee, hashes the password and hides it', async () => {
    const res = await request(app)
      .post('/api/employees')
      .set(as(hrAdmin))
      .send(newEmployee('crud'));

    assert.equal(res.status, 201);
    assert.equal(res.body.name, `${PREFIX}crud`);
    assert.equal(res.body.isActive, true);
    assert.equal(res.body.password, undefined);
    id = res.body.employeeID;

    const stored = await Employee.findByPk(id);
    assert.notEqual(stored.password, PASSWORD);
    assert.match(stored.password, /^\$2[aby]\$/); // bcrypt hash
  });

  test('GET / lists employees without any password field', async () => {
    const res = await request(app).get('/api/employees').set(as(hrAdmin));
    assert.equal(res.status, 200);
    assert.ok(res.body.some((e) => e.employeeID === id));
    assert.ok(res.body.every((e) => e.password === undefined));
  });

  test('GET /:id returns the employee without the password', async () => {
    const res = await request(app).get(`/api/employees/${id}`).set(as(hrAdmin));
    assert.equal(res.status, 200);
    assert.equal(res.body.employeeID, id);
    assert.equal(res.body.password, undefined);
  });

  test('GET /:id returns 404 for a missing employee', async () => {
    const res = await request(app).get('/api/employees/2147483000').set(as(hrAdmin));
    assert.equal(res.status, 404);
  });

  test('PUT /:id updates ordinary fields', async () => {
    const res = await request(app)
      .put(`/api/employees/${id}`)
      .set(as(hrAdmin))
      .send({ contact: '0711111111' });
    assert.equal(res.status, 200);
    assert.equal(res.body.contact, '0711111111');
    assert.equal(res.body.password, undefined);
  });

  test('PUT /:id hashes a changed password', async () => {
    const res = await request(app)
      .put(`/api/employees/${id}`)
      .set(as(hrAdmin))
      .send({ password: 'Changed-pass-2' });
    assert.equal(res.status, 200);

    const stored = await Employee.findByPk(id);
    assert.notEqual(stored.password, 'Changed-pass-2');
    assert.match(stored.password, /^\$2[aby]\$/);
  });

  test('PUT /:id returns 404 for a missing employee', async () => {
    const res = await request(app)
      .put('/api/employees/2147483000')
      .set(as(hrAdmin))
      .send({ contact: 'x' });
    assert.equal(res.status, 404);
  });

  // Known issue, not yet fixed: the request body reaches Employee.update()
  // unfiltered, so an HR admin can promote anyone to superAdmin. This test
  // describes the intended behaviour; remove `todo` once the fix is in.
  test('PUT /:id must not let an HR admin change a role', { todo: true }, async () => {
    await request(app)
      .put(`/api/employees/${id}`)
      .set(as(hrAdmin))
      .send({ role: 'superAdmin' });
    const stored = await Employee.findByPk(id);
    assert.equal(stored.role, 'user');
  });

  test('DELETE /:id removes the employee', async () => {
    const res = await request(app).delete(`/api/employees/${id}`).set(as(hrAdmin));
    assert.equal(res.status, 204);
    assert.equal(await Employee.findByPk(id), null);
  });

  test('DELETE /:id returns 404 once the employee is gone', async () => {
    const res = await request(app).delete(`/api/employees/${id}`).set(as(hrAdmin));
    assert.equal(res.status, 404);
  });
});

describe('/api/super-admin', () => {
  test('POST creates a user and ignores fields outside the whitelist', async () => {
    const res = await request(app)
      .post('/api/super-admin')
      .set(as(superAdmin))
      .send({ ...newEmployee('super'), isActive: false, employeeID: 2147483001 });

    assert.equal(res.status, 201);
    assert.equal(res.body.isActive, true);
    assert.notEqual(res.body.employeeID, 2147483001);
    assert.equal(res.body.password, undefined);
  });

  test('GET / lists users without any password field', async () => {
    const res = await request(app).get('/api/super-admin').set(as(superAdmin));
    assert.equal(res.status, 200);
    assert.ok(res.body.some((e) => e.name === `${PREFIX}super`));
    assert.ok(res.body.every((e) => e.password === undefined));
  });

  test('GET /analytics responds for a super admin', async () => {
    const res = await request(app).get('/api/super-admin/analytics').set(as(superAdmin));
    assert.equal(res.status, 200);
    assert.equal(typeof res.body, 'object');
  });
});

describe('/api/crops', () => {
  let id;
  const newCrop = () => ({
    type: `${PREFIX}maize`,
    plantingDate: '2026-03-01',
    expectedHarvestDate: '2026-07-01',
    fieldID: field.fieldID,
  });

  test('POST creates a crop with default status', async () => {
    const res = await request(app).post('/api/crops').set(as(cropUser)).send(newCrop());
    assert.equal(res.status, 201);
    assert.equal(res.body.type, `${PREFIX}maize`);
    assert.equal(res.body.status, 'growing');
    assert.equal(res.body.isInfested, false);
    id = res.body.cropID;
  });

  test('POST without required fields is rejected and stores nothing', async () => {
    const before = await Crop.count({ where: { fieldID: field.fieldID } });
    const res = await request(app)
      .post('/api/crops')
      .set(as(cropUser))
      .send({ fieldID: field.fieldID });
    assert.equal(res.status, 500); // current behaviour: validation errors surface as 500
    assert.equal(await Crop.count({ where: { fieldID: field.fieldID } }), before);
  });

  test('GET / includes the new crop', async () => {
    const res = await request(app).get('/api/crops').set(as(cropUser));
    assert.equal(res.status, 200);
    assert.ok(res.body.some((c) => c.cropID === id));
  });

  test('GET /:id returns the crop', async () => {
    const res = await request(app).get(`/api/crops/${id}`).set(as(cropUser));
    assert.equal(res.status, 200);
    assert.equal(res.body.cropID, id);
  });

  test('GET /:id returns 404 for a missing crop', async () => {
    const res = await request(app).get('/api/crops/2147483000').set(as(cropUser));
    assert.equal(res.status, 404);
  });

  test('PUT /:id updates the crop', async () => {
    const res = await request(app)
      .put(`/api/crops/${id}`)
      .set(as(cropUser))
      .send({ status: 'harvested', yieldQuantity: 12.5, yieldUnit: 'tonnes' });
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'harvested');
    assert.equal(res.body.yieldQuantity, 12.5);
  });

  test('DELETE /:id is refused for a plain user and keeps the crop', async () => {
    const res = await request(app).delete(`/api/crops/${id}`).set(as(cropUser));
    assert.equal(res.status, 403);
    assert.notEqual(await Crop.findByPk(id), null);
  });

  test('DELETE /:id by an admin removes the crop', async () => {
    const res = await request(app).delete(`/api/crops/${id}`).set(as(cropAdmin));
    assert.equal(res.status, 204);
    assert.equal(await Crop.findByPk(id), null);
  });
});
