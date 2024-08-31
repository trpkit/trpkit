import { Router } from "express";

const router = Router();

/**
 * Registers a new account
 *
 * 201 - Successful registration
 * 400 - Required fields are missing or invalid
 * 409 - Email already registered
 */
router.post("/register", (_req, res) => {
  // validate request
  // validate srp (verifier len 344, salt len 44)
  // check if email already exists
  // store user record
  // store register event in audit logs for user
  // create token and set as header to log user in

  // set cookie header for token
  res.status(201);
});

export default router;
