import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

// Minimal stand-ins for Express's req/res/next.
const run = (middleware, user) => {
  const result = { status: null, body: null, nextCalled: false };
  const res = {
    status(code) { result.status = code; return this; },
    json(body) { result.body = body; return this; },
  };
  middleware({ user }, res, () => { result.nextCalled = true; });
  return result;
};

describe('role middleware', () => {
  test('rejects a request with no authenticated user', () => {
    const result = run(role(['admin']), undefined);
    assert.equal(result.status, 401);
    assert.equal(result.nextCalled, false);
  });

  test('allows a user whose role is in the allowed list', () => {
    const result = run(role(['user', 'admin']), { role: 'user' });
    assert.equal(result.nextCalled, true);
  });

  test('rejects a user whose role is not in the allowed list', () => {
    const result = run(role(['admin']), { role: 'user' });
    assert.equal(result.status, 403);
    assert.equal(result.nextCalled, false);
  });

  test('always allows a superAdmin', () => {
    const result = run(role(['admin']), { role: 'superAdmin' });
    assert.equal(result.nextCalled, true);
  });
});

describe('department middleware', () => {
  test('rejects a request with no authenticated user', () => {
    const result = run(department('crop'), undefined);
    assert.equal(result.status, 401);
  });

  test('allows a user from the matching department', () => {
    const result = run(department('crop'), { role: 'user', department: 'crop' });
    assert.equal(result.nextCalled, true);
  });

  test('rejects a user from another department', () => {
    const result = run(department('crop'), { role: 'admin', department: 'HR' });
    assert.equal(result.status, 403);
    assert.equal(result.nextCalled, false);
  });

  test('always allows a superAdmin', () => {
    const result = run(department('crop'), { role: 'superAdmin', department: 'HR' });
    assert.equal(result.nextCalled, true);
  });
});
