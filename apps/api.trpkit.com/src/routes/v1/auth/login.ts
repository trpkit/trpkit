import { Router } from "express";

const router = Router();

router.post("/login/challenge", (_req, res) => {
  // validate email exists
  // return email, srp challenge, srp salt, ephemeral

  res.status(200);
});

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
