// Loaded before every test file (see the "test" script in package.json).
//
// dotenv never overrides variables that are already set, so fixing these here
// decides which database and JWT secret the tests use, whatever the root .env
// says.
//
// The database is TEST_DATABASE_URL if set, otherwise the "test" entry of
// config/config.json. It must be on this machine: the database-backed tests
// create and delete rows, and must never do that on a hosted database.
import { readFileSync } from 'node:fs';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

const configFile = new URL('../config/config.json', import.meta.url);
const testDatabaseUrl =
  process.env.TEST_DATABASE_URL ||
  JSON.parse(readFileSync(configFile, 'utf8')).test.url;

const { hostname } = new URL(testDatabaseUrl);
if (!LOCAL_HOSTS.has(hostname)) {
  throw new Error(
    `Refusing to run tests: the test database host "${hostname}" is not local.`
  );
}

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = testDatabaseUrl;
process.env.JWT_SECRET = 'test-only-secret';
