# Vercel, onboarding, and Cashfree hardening

## Root causes fixed

- Vercel followed `pnpm-lock.yaml` while dependency changes had updated npm metadata. The repository is now npm-only: `package-lock.json` is authoritative, pnpm lock/workspace files are removed, and `firebase-admin` is pinned exactly to `13.10.0` in both manifest and lockfile.
- Firebase Admin's incompatible dependency graph caused the deployed webhook ESM crash. Admin remains behind `server-only`, is initialized once with `getApps()`, and all 36 API route handlers explicitly select `nodejs`. No client component imports `firebase-admin`.
- Login automatically sent verification mail and treated missing membership as terminal. Verification now has explicit resend/check/sign-out controls, a 60-second resend cooldown, user reload before recheck, generic credential/reset errors, and a production-enforced verification requirement. A verified membership-less account receives a restricted onboarding session when enabled.
- Onboarding now derives UID from the secure session and transactionally creates the tenant, OWNER membership, user tenant reference, turf, normalized unique public slug/projection, hours, base pricing, booking settings, and audit record. The deterministic tenant ID and user marker make retry/double submission idempotent. No demo business data is created.
- Cashfree's unsigned connectivity probe previously followed the real-event signature path. Both webhook routes now read the raw body once, accept only harmless unsigned probes without writes, reject event-like or partially signed requests, verify exact `timestamp + rawBody` Base64 HMAC before JSON parsing, ignore valid unknown test events without mutation, and retain signed real-event processing. Payment/refund events claim a persistent event ID before mutation, repeated deliveries return idempotently, and retryable failures release the claim. Real Cashfree success is additionally verified through Cashfree order/payment APIs before booking finalization.

## Required Vercel variables for the current sandbox demo

`APP_ENV=production`, `APP_URL=https://turfmate-complete-project.vercel.app`, `NEXT_PUBLIC_DATA_MODE=firebase`, `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false`, `CASHFREE_ENV=sandbox`, `NEXT_PUBLIC_CASHFREE_MODE=sandbox`, `PAYMENT_PROVIDER=cashfree`, `APP_CHECK_MODE=disabled`, `ALLOW_SELF_SERVICE_ONBOARDING=true`, and `OWNER_EMAIL_VERIFICATION_REQUIRED=true`. Also configure Firebase web values, Firebase Admin ADC/service identity, non-placeholder Cashfree sandbox App ID/Secret Key, `PAYMENT_SETTLEMENT_MODE=PLATFORM`, a 32+ character lookup HMAC secret, a 32+ character cron secret, and session settings. The central startup validator rejects mode mismatch, mock production payments, placeholder/missing Cashfree credentials, wrong/local production URL, Firebase local mode/emulators, and unsafe verification/onboarding flags.

## Deployment checklist

1. Use `npm ci`; do not recreate a pnpm lockfile.
2. Configure Email/Password Auth and authorized domain `turfmate-complete-project.vercel.app`.
3. Deploy Firestore indexes, then Firestore rules. Initialize Firebase Storage manually before deploying its deny-by-default rules; Storage is not required for onboarding.
4. Configure Cashfree sandbox Hosted Checkout domain/return URL and webhook URLs `https://turfmate-complete-project.vercel.app/api/webhooks/cashfree` and `/api/webhooks/cashfree-refunds`.
5. Verify harmless Cashfree connectivity probes, then one real success, failure, user-dropped payment, duplicate delivery, reconciliation, cancellation, refund, and duplicate refund callback.
6. Verify empty-project signup -> email verification -> onboarding -> `arena-11-thane` public URL -> booking -> signed webhook -> one dashboard booking and occupied-slot rejection.

Domain whitelisting affects whether Hosted Checkout opens; it does not change webhook HMAC verification. A domain rejection leaves the active hold available for retry and is shown as a recoverable UI error.

## Still credential-dependent

One real Cashfree sandbox payment, signed payment webhook, signed refund webhook, deployed Firebase identity/rules/index readiness, domain approval, public HTTPS reachability, and cron delivery must still be verified on Vercel. Until those pass, TurfMate is not described as production-ready.
