import { Router } from "express";

const router = Router();

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
