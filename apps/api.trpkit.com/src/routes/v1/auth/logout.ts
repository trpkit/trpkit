import { Router } from "express";

const router = Router();

router.post("/logout", (_req, res) => {
  // validate user is logged in
  // create ttl from current token
  // store token in blacklist collection with ttl (using mongodb ttl index)
  // store logout event in audit logs for user

  // create set-cookie header for clearing token
  res.status(202);
});

export default router;
