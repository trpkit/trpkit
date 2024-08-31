import { Router } from "express";

const router = Router();

/**
 * Log user out
 *
 * 202 - Successfully processed logout request
 * 401 - User not logged in (ideally should just return 202 with expired cookie)
 */
router.delete("/logout", (_req, res) => {
  // validate user is logged in
  // create ttl from current token
  // store token in blacklist collection with ttl (using mongodb ttl index)
  // store logout event in audit logs for user

  // create set-cookie header for clearing token
  res.status(202);
});

export default router;
