import { Router } from "express";

const router = Router();

/**
 * Initiates SRP challenge
 *
 * 200 - Challenge successfully created
 * 400 - Email is missing
 * 404 - User not found (ideally should return 200 with bogus salt/ephemeral)
 */
router.post("/login/challenge", (_req, res) => {
  // validate email exists
  // return email, srp challenge, srp salt, ephemeral

  res.status(200);
});

/**
 * Validating SRP challenge
 *
 * 200 - Challenge validated successfully
 * 400 - SRP parameters invalid
 * 403 - SRP challenge fails
 * 404 - User not found (ideally should return 403 because bogus salt/ephemeral)
 */
router.post("/login/response", (_req, res) => {
  // validate server ephemeral exists in db
  // validate user exists
  // create srp session and validate client and server challenges
  // determine if 2fa is needed
  // create token and set as header to log user in
  // store login event in audit logs for user

  // set cookie header for token
  res.status(200);
});

/**
 * 2FA verification
 *
 * 200 - 2FA successfully verified
 * 400 - 2FA not enabled or code is incorrect
 * 403 - 2FA verification failed
 * 401 - User not logged in
 */
router.post("/login/checkpoint", (_req, res) => {
  // validate user is logged in
  // validate user exists
  // check if token 2fa is already verified and return master salt if so
  // validate user has 2fa enabled
  // verify if code is correct
  // create new token with 2fa enabled

  // set cookie header for token
  res.status(200);
});

export default router;
