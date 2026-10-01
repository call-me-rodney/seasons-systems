import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Import the real authService module ──
const authService = (await import('../services/authService.js')).default;

// ── Helper: read source files ──
function readSource(relativePath) {
  return readFileSync(join(__dirname, relativePath), 'utf8');
}

// ── Tests ──

test('authService exists and exposes a login function', () => {
  assert.ok(authService, 'authService should exist');
  assert.equal(typeof authService.login, 'function', 'authService.login should be a function');
});

test('authController no longer imports bcrypt, jwt, or models directly', () => {
  const controllerSource = readSource('../controllers/authController.js');
  assert.ok(!controllerSource.includes("import bcrypt"), 'controller should not import bcrypt');
  assert.ok(!controllerSource.includes("import jwt"), 'controller should not import jwt');
  assert.ok(!controllerSource.includes("import dbPromise"), 'controller should not import models');
  assert.ok(!controllerSource.includes("import db"), 'controller should not import db');
});

test('authController delegates to authService', () => {
  const controllerSource = readSource('../controllers/authController.js');
  assert.ok(controllerSource.includes('authService'), 'controller should reference authService');
  assert.ok(controllerSource.includes('authService.login'), 'controller should call authService.login');
});

test('authService owns the authentication business logic', () => {
  const serviceSource = readSource('../services/authService.js');
  assert.ok(serviceSource.includes('bcrypt'), 'service should own bcrypt');
  assert.ok(serviceSource.includes('jwt'), 'service should own jwt');
  assert.ok(serviceSource.includes('Employee'), 'service should own Employee model access');
  assert.ok(serviceSource.includes('findOne'), 'service should own user lookup');
});

test('authService uses lazy initialization (no DB connection on import)', () => {
  const serviceSource = readSource('../services/authService.js');
  // The service should not have top-level `await dbPromise` or `const { Employee } = db`
  // It should defer DB access until login() is called via getEmployee()
  const lines = serviceSource.split('\n');
  const topLevelDbAccess = lines.filter(line => {
    const trimmed = line.trim();
    // Top-level would be no indentation — but inside a function it's indented
    return (trimmed.startsWith('const db = await dbPromise') || trimmed.startsWith('const { Employee } = db')) && !line.startsWith(' ') && !line.startsWith('\t');
  });
  assert.equal(topLevelDbAccess.length, 0, 'service should not access db at the top level');
  assert.ok(
    serviceSource.includes('getEmployee'),
    'service should use lazy getEmployee() helper'
  );
});
