import { Router } from "express";

const router = Router();

router.post("/mfa/disable", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa enabled
  // verify 2fa code
  // disable 2fa
  // create new token with updated 2fa status

  // set cookie header for token
  res.status(200);
});

router.post("/mfa/enable", (_req, res) => {
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
