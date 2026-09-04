# Testing

- `npm test` — all Vitest unit, domain, API contract, payment, refund, and webhook-security tests; emulator-only rules suites are skipped here.
- `npm run test:unit` — domain, booking, concurrency, limiter, and App Check tests.
- `npm run test:payments` — mocked Cashfree payment contracts.
- `npm exec vitest run tests/refunds` — cancellation/refund contracts.
- `npm run test:integration` — API boundary contracts.
- `npm run test:rules` — Firestore emulator tenant-isolation/default-deny rules.
- `npm run test:storage-rules` — Storage emulator default-deny rules.
- `npm run test:e2e` — 36 serial Playwright scenarios using Auth, Firestore, and Storage emulators plus mocked Cashfree. Next runs on port 3100 with `.next-e2e`.
- `npm run typecheck`, `npm run lint`, `npm run build` — static and production-build gates.

Rules tests require Java; Playwright requires Chromium (`npm exec playwright install chromium`). Live Cashfree tests are intentionally excluded until sandbox credentials and a reachable HTTPS webhook exist. Never put real credentials in automated local tests.

## Last credential-free verification — 4 September 2026

- Unit/domain/API/payment/refund/webhook security: 9 files, 54 tests passed.
- Firestore rules: 1 file, 4 tests passed.
- Storage rules: 1 file, 2 tests passed.
- Playwright emulator E2E: 36 tests passed.
- TypeScript: passed with no errors.
- ESLint: passed with no errors or warnings.
- Next.js production build: passed; 66 route entries discovered (36 API route files, 29 page files, and the generated not-found route).
- Client bundle scan: no server-secret names, private-key markers, or E2E payment secret found.

Total automated tests/scenarios reported by these gates: 96 passed.
