import { Router } from "express";

const router = Router();

// Create new org
router.post("/orgs", (_req, _res) => {});

// Get org info
router.get("/orgs/:orgId", (_req, _res) => {});

// Update org info
router.put("/orgs/:orgId", (_req, _res) => {});

// Delete org
router.delete("/orgs/:orgId", (_req, _res) => {});

// Invite user to org
router.post("/orgs/:orgId/members/invite", (_req, _res) => {});

// Get org members
router.get("/orgs/:orgId/members", (_req, _res) => {});

// Remove member from org
router.delete("/orgs/:orgId/members/:userId", (_req, _res) => {});

// List of orgs
router.get("/orgs", (_req, _res) => {});

// Leave org
router.post("/orgs/:orgId/leave", (_req, _res) => {});

export default router;
