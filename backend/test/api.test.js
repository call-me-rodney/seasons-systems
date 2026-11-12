import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import configs from '../configs/configs.js';
import { toPublic } from '../services/employeeService.js';

const tokenFor = (payload) =>
  jwt.sign(payload, configs.auth.jwtSecret, { expiresIn: '5m' });

describe('GET /health', () => {
  test('reports ok without authentication', async () => {
    const res = await request(app).get('/health');
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { status: 'ok' });
  });
});

describe('authentication on protected routes', () => {
  const protectedRoutes = [
    '/api/employees',
    '/api/crops',
    '/api/livestock',
    '/api/fields',
    '/api/pens',
    '/api/equipment',
    '/api/inventory',
    '/api/sales',
    '/api/salesdetails',
    '/api/suppliers',
    '/api/resupplies',
    '/api/super-admin',
  ];

  for (const route of protectedRoutes) {
    test(`GET ${route} without a token returns 401`, async () => {
      const res = await request(app).get(route);
      assert.equal(res.status, 401);
      assert.equal(res.body.error, 'No token provided');
    });
  }

  test('a malformed token returns 403', async () => {
    const res = await request(app)
      .get('/api/crops')
      .set('Authorization', 'Bearer not-a-real-token');
    assert.equal(res.status, 403);
    assert.equal(res.body.error, 'Invalid token');
  });

  test('a token signed with the wrong secret returns 403', async () => {
    const forged = jwt.sign({ id: 1, role: 'superAdmin' }, 'some-other-secret');
    const res = await request(app)
      .get('/api/super-admin')
      .set('Authorization', `Bearer ${forged}`);
    assert.equal(res.status, 403);
  });
});

// These requests are rejected by middleware, so no controller or database
// query ever runs.
describe('authorization on protected routes', () => {
  test('a user from another department cannot read crops', async () => {
    const token = tokenFor({ id: 1, role: 'admin', department: 'HR' });
    const res = await request(app)
      .get('/api/crops')
      .set('Authorization', `Bearer ${token}`);
    assert.equal(res.status, 403);
    assert.equal(res.body.error, 'Forbidden: insufficient department');
  });

  test('a plain user cannot delete a crop', async () => {
    const token = tokenFor({ id: 1, role: 'user', department: 'crop' });
    const res = await request(app)
      .delete('/api/crops/1')
      .set('Authorization', `Bearer ${token}`);
    assert.equal(res.status, 403);
    assert.equal(res.body.error, 'Forbidden: insufficient role');
  });

  test('an admin cannot reach super-admin routes', async () => {
    const token = tokenFor({ id: 1, role: 'admin', department: 'HR' });
    const res = await request(app)
      .get('/api/super-admin')
      .set('Authorization', `Bearer ${token}`);
    assert.equal(res.status, 403);
  });

  test('a plain user cannot use the planner', async () => {
    const token = tokenFor({ id: 1, role: 'user', department: 'crop' });
    const res = await request(app)
      .post('/api/planner/suggest')
      .set('Authorization', `Bearer ${token}`)
      .send({ prompt: 'plan my week' });
    assert.equal(res.status, 403);
  });
});

describe('employeeService.toPublic', () => {
  test('removes the password hash and keeps other fields', () => {
    const employee = {
      toJSON: () => ({ employeeID: 7, name: 'Test User', role: 'user', password: 'hash' }),
    };
    assert.deepEqual(toPublic(employee), { employeeID: 7, name: 'Test User', role: 'user' });
  });

  test('returns null for a missing employee', () => {
    assert.equal(toPublic(null), null);
  });
});
