# Compiled "Before" Report

Baseline review of `seasons-systems` before any Question 3 or 4 fixes are applied.

- **Commit reviewed:** `cf51485` ("Prep for phase 2"), plus the uncommitted lint and test setup
- **Date:** 2026-11-12
- **Security testing scope:** local machine only (`localhost`)

## 1. Tools, versions and scope

| Tool | Version | Role | Configuration and scope | Raw output |
|---|---|---|---|---|
| ESLint | 10.14.0 | Code quality | `backend/eslint.config.js`, `@eslint/js` recommended rules, Node globals. Scope: `backend/` excluding `node_modules`, `coverage`, `reports` | `eslint.txt` |
| node:test + Supertest | Node 24.18.0, Supertest 7.3.2 | Testing | `npm test` in `backend/`. Runs against the local PostgreSQL test database (`test` entry in `config/config.json`) | `tests.txt` |
| OWASP ZAP | 2.17.0 | Running-app security | Manual explore through ZAP's proxy, passive scan only. Sites: backend `http://localhost:4000`, frontend dev server `http://localhost:5173` | `2026-11-12-ZAP-Report-.html` |
| OWASP Dependency-Check | 13.0.0 | Dependency security | Project `seasons-systems`, scan of `backend/` and `frontend/`, NVD data current to 2026-11-12 | `dependency-check-report.html` |
| npm audit | npm 11.16.0 | Cross-check for Dependency-Check | `npm audit` in `backend/` and `frontend/` | Summarised in section 3, issue 2 |

## 2. Results at a glance

| Tool | Result |
|---|---|
| ESLint | 13 errors, 0 warnings |
| Tests | 54 tests: 53 pass, 0 fail, 1 todo (a known bug, see issue 1) |
| ZAP | 17 alert types: 0 high, 5 medium, 5 low, 7 informational |
| Dependency-Check | 52 vulnerable dependencies, 348 vulnerabilities, 0 suppressed |
| npm audit, backend | 24 vulnerable packages: 2 critical, 14 high, 8 moderate |
| npm audit, frontend | 20 vulnerable packages: 1 critical, 15 high, 3 moderate, 1 low |

## 3. Top five issues

Ranked by how much damage each could do and how confident the evidence is.

| # | Issue | Found by | Severity |
|---|---|---|---|
| 1 | An HR admin can promote any employee to `superAdmin` | Tests | High |
| 2 | Known-vulnerable dependencies, including critical ones | Dependency-Check, npm audit | High |
| 3 | Any website can call the API, and security headers are missing | ZAP | Medium |
| 4 | Internal error details are returned to the client | ZAP, ESLint, tests | Medium |
| 5 | The login token is stored in browser `localStorage` | ZAP | Medium |

### Issue 1: Privilege escalation through unfiltered updates

**Evidence.** The test `PUT /:id must not let an HR admin change a role` in `backend/test/db.test.js` sends `{ "role": "superAdmin" }` as an HR admin. The stored role comes back as `superAdmin` where `user` was expected. The test is marked `todo`, so it is reported without failing the run.

**Cause.** `update()` in `backend/services/employeeService.js` passes the whole request body to `employee.update()`. Only `createUser` in `superAdminController.js` restricts which fields are accepted.

**Why it matters.** `superAdmin` bypasses every role and department check in the middleware, so one HR admin account can take over the whole system. This is OWASP A01, Broken Access Control, and a broken service contract: the service trusts its caller to send only safe fields.

**Solution.**

1. Give the service an explicit list of fields each caller may change.
2. Allow `role` and `department` to change only through the super-admin route.
3. Remove the `todo` flag from the test so it passes as a normal test, and add a test showing a super admin can still change a role.

### Issue 2: Known-vulnerable dependencies

**Evidence.** Dependency-Check reports 52 vulnerable dependencies. Packages it rates critical are `axios` 1.11.0, `lodash` 4.17.21, `dottie` 2.0.6, `proxy-addr` 2.0.7, `postcss` 8.5.6 and `react` 19.1.1. Packages the application depends on directly and that are flagged high or above:

| Package | Installed | Used in |
|---|---|---|
| `axios` | 1.11.0 | Backend and frontend |
| `express` (through `body-parser`, `qs`, `path-to-regexp`, `proxy-addr`) | 4.21.2 | Backend |
| `sequelize` | 6.37.7 | Backend |
| `ws` | 8.18.3 | Backend |
| `jsonwebtoken` (through `jws` 3.2.2) | 9.0.2 | Backend |
| `react-router-dom` | 7.8.2 | Frontend |
| `vite` | 7.1.3 | Frontend build |
| `postcss` | 8.5.6 | Frontend build |

**Why it matters.** These libraries handle every request, every database query, token signing and the WebSocket server. This is OWASP A06, Vulnerable and Outdated Components.

**Triage notes.**

- npm audit confirms the direct dependencies above and reports a non-breaking fix for nearly all of them.
- The two tools disagree on some severities. For example, Dependency-Check rates `axios` critical and npm audit rates it high. The "after" comparison should use the same tool on both sides.
- `@redis/bloom` 1.2.0 is matched to the RedisBloom server product with low confidence. It is a client library, so this is probably a false positive and a candidate for a documented suppression.
- Three flagged packages (`eslint`, `@eslint/js`, `minimatch`) are development tools added for this review. npm audit's suggested fix is a move to ESLint 9.39.5.

**Solution.**

1. Run `npm audit fix` in `backend/` and in `frontend/`. Do not use `--force`.
2. Run the test suite and start the application to confirm nothing changed.
3. Re-run Dependency-Check and npm audit, and record what remains with a reason for each.

### Issue 3: Open CORS and missing security headers

**Evidence (ZAP).**

- Backend responses carry `Access-Control-Allow-Origin: *` (Cross-Domain Misconfiguration, medium).
- Backend responses carry `X-Powered-By: Express` (low).
- `X-Content-Type-Options` is missing (low, 13 instances).
- The frontend has no Content Security Policy (medium) and no anti-clickjacking header (medium).

**Cause.** `backend/app.js` calls `cors()` with no options and sets no security headers.

**Why it matters.** Any site a logged-in user visits can send requests to the API and read the responses. The missing headers remove the browser's defences against content sniffing, framing and injected scripts. This is OWASP A05, Security Misconfiguration.

**Triage notes.** The frontend was scanned on the Vite development server. `frontend/nginx.conf` already sets `X-Frame-Options` and `X-Content-Type-Options` for production, so those two frontend alerts are partly an artefact of the scan target. The missing CSP is real in both.

**Solution.**

1. Add `helmet` to the backend. It sets the standard headers and removes `X-Powered-By`.
2. Restrict `cors()` to the frontend's origin, read from configuration.
3. Add a `Content-Security-Policy` header to `frontend/nginx.conf`.
4. Run the "after" frontend scan against a production build, so header changes are visible.

### Issue 4: Internal error details returned to the client

**Evidence.**

- ZAP, Application Error Disclosure: `POST /api/planner/suggest` returned status 500 with the body `Failed to get response from Ollama: getaddrinfo ENOTFOUND ollama`, which exposes an internal hostname.
- Tests: posting a crop with missing fields returns 500 with the raw validation message, where 400 is the correct status for bad input.
- ESLint, `preserve-caught-error` at `services/ollamaService.js:18`: the caught error is rethrown without its cause, so the original stack trace is lost from the logs.

**Cause.** Every controller has its own `catch` block that sends `error.message` straight to the client.

**Why it matters.** Error text reveals hostnames, table and column names, and library behaviour to anyone probing the API. The duplicated `catch` blocks also mean a fix has to be repeated in every controller, which is a maintainability problem.

**Solution.**

1. Add one Express error-handling middleware that logs the full error and returns a generic message for 500 responses.
2. Map Sequelize validation errors to 400 with a safe message.
3. Rethrow in `ollamaService.js` with `{ cause: error }`.
4. Update the crop test to expect 400, and add a test that a 500 response body contains no internal detail.

### Issue 5: Login token stored in `localStorage`

**Evidence (ZAP).** Information Disclosure - JWT in Browser localStorage, medium risk, high confidence. `frontend/src/context/AuthContext.jsx` writes the token and the user object to `localStorage`, and `frontend/src/services/api.js` reads it back for every request.

**Why it matters.** Any script that runs on the page can read `localStorage`. With no Content Security Policy (issue 3), a single cross-site scripting flaw or a compromised frontend dependency (issue 2) would expose the token, and the token stays valid for one day with no way to revoke it.

**Solution.**

1. Have the backend set the token in an `httpOnly`, `SameSite` cookie at login, and read it from the cookie in `middleware/auth.js`.
2. Remove the token from `localStorage` and send requests with credentials.
3. Add a logout route that clears the cookie.

This depends on issue 3, because cookie-based requests require CORS to name a specific origin. If the change is too large for this phase, the interim mitigation is the CSP from issue 3 plus a shorter token lifetime, with the cookie change recorded as the next improvement.

## 4. Findings not in the top five

| Finding | Tool | Decision | Reason |
|---|---|---|---|
| Unused `Sequelize` parameter in 11 migrations | ESLint | Reject | It is the signature Sequelize CLI passes to `down()`; handle with a config exception |
| Unused `__dirname` in `app.js` | ESLint | Fix | Dead code, trivial |
| Sub Resource Integrity missing on the Google Fonts link | ZAP | Defer | The stylesheet varies per browser, so a fixed hash would break it; self-hosting the font is the proper fix |
| Sensitive Information in URL (`?token=`) | ZAP | Reject | The application never puts a token in a URL; the parameter appears to come from ZAP's browser launch |
| Suspicious Comments, Modern Web Application, cache alerts | ZAP | Reject | Vite development-server internals and informational notes |
| Session Management Response Identified | ZAP | Reject | Informational; ZAP recognising the login response |
| Alerts on Microsoft, Azure and Google hosts | ZAP | Out of scope | Browser background traffic and third-party sites, not this application |

## 5. Limits of this baseline

- The ZAP scan was passive and covered only pages visited as one user. It cannot detect access-control flaws such as issue 1.
- The tests cover authentication, authorization, employees, super-admin and crops. The other CRUD controllers, the planner and the WebSocket server have no tests.
- ESLint's recommended rules do not measure duplication, so the eleven near-identical CRUD controllers do not appear in its results.
- The ZAP HTML report in this folder was generated before its scope was narrowed and contains login data. It must be regenerated before it is shared or committed.
