import { Router } from "express";

const router = Router();

/**
 * Enable 2FA
 *
 * 200 - 2FA enabled
 * 400 - 2FA already enabled
 * 401 - User not logged in
 */
router.post("/mfa", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa disabled
  // create 2fa secret and pass into body
  // store 2fa status as pending
  // create new token with 2fa enabled (indicates 2fa is pending)
  // store 2fa status change event in audit logs for user

  // set cookie header for token
  res.status(200);
});

/**
 * Disable 2FA
 *
 * 200 - 2FA disabled
 * 400 - 2FA not enabled
 * 401 - User not logged in
 */
router.delete("/mfa", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa enabled
  // verify 2fa code
  // disable 2fa
  // create new token with updated 2fa status

  // set cookie header for token
  res.status(200);
});

/**
 * Verify 2FA setup process
 *
 * 200 - 2FA setup successful
 * 400 - 2FA code invalid
 * 403 - 2FA code incorrect
 */
router.post("/mfa/verify", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa not disabled
  // validate user has 2fa not enabled
  // verify code user input
  // generate backup codes (8 codes) and pass into body
  // store 2fa status as enabled
  // create new token with 2fa enabled
  // store 2fa status change event in audit logs for user

  res.status(200);
  // set cookie header for token
});

export default router;
