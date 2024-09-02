import { env } from "@/env";
import { ForbiddenError, NotFoundError, ValidationError } from "@/errors";
import { mongo } from "@/lib/mongo";
import { type AuthenticatedRequest, authHandler } from "@/middlewares/authHandler";
import type { Organization } from "@/types/organization";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { z } from "zod";

const router = Router();

const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
});

router.post("/orgs", authHandler, async (req: AuthenticatedRequest, res, next) => {
  try {
    const parsed = createOrganizationSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((error) => error.message).join(", "));
    }

    const { name } = parsed.data;
    const userId = req.user?.id;
    const createdAt = new Date();

    if (!userId) {
      // Safer, but redundant - also makes biome happy
      throw new NotFoundError("User");
    }

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const result = await db.collection<Organization>("organizations").insertOne({
      name,
      ownerId: userId,
      members: [
        {
          userId: userId,
          role: "owner",
          joinedAt: createdAt,
        },
      ],
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    res.status(201).json({ organizationId: result.insertedId.toString() });
  } catch (err) {
    next(err);
  }
});

router.get("/orgs/:orgId", authHandler, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user?.id;
    const orgId = req.params.orgId;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const organization = await db
      .collection<Organization>("organizations")
      .findOne({ _id: new ObjectId(orgId), "members.userId": userId });

    if (!organization) {
      throw new NotFoundError("Organization");
    }

    res.status(200).json(organization);
  } catch (err) {
    next(err);
  }
});

// Update org info
router.put("/orgs/:orgId", (_req, _res) => {
  // TODO implementation
});

router.delete("/orgs/:orgId", authHandler, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user?.id;
    const orgId = req.params.orgId;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const organization = await db
      .collection<Organization>("organizations")
      .findOne({ _id: new ObjectId(orgId), "members.userId": userId });

    if (!organization) {
      throw new NotFoundError("Organization");
    }

    const isPrimaryOwner = organization.ownerId === userId;

    if (!isPrimaryOwner) {
      throw new ForbiddenError("You cannot delete the organization.");
    }

    await db.collection<Organization>("organizations").deleteOne({ _id: new ObjectId(orgId) });

    // TODO ensure we delete references to the organization as well (once implemented)

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Invite user to org
router.post("/orgs/:orgId/members/invite", (_req, _res) => {
  // TODO implementation
});

// Get org members
router.get("/orgs/:orgId/members", (_req, _res) => {
  // TODO implementation
});

// Remove member from org
router.delete("/orgs/:orgId/members/:userId", (_req, _res) => {
  // TODO implementation
});

router.get("/orgs", authHandler, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user?.id;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const organizations = await db
      .collection<Organization>("organizations")
      .find({
        "members.userId": userId,
      })
      .toArray();

    res.status(200).json(organizations);
  } catch (err) {
    next(err);
  }
});

router.post("/orgs/:orgId/leave", authHandler, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user?.id;
    const orgId = req.params.orgId;

    const client = await mongo();
    const db = client.db(env.MONGO_DB);

    const organization = await db
      .collection<Organization>("organizations")
      .findOne({ _id: new ObjectId(orgId), "members.userId": userId });

    if (!organization) {
      throw new NotFoundError("Organization");
    }

    const isPrimaryOwner = organization.ownerId === userId;

    if (isPrimaryOwner) {
      const otherOwners = organization.members.filter(
        (member) => member.role === "owner" && member.userId !== userId
      );

      if (otherOwners.length > 0) {
        // Transfer ownership to longest-serving organization owner
        const newOwner = otherOwners.reduce((longestServing, current) => {
          return new Date(longestServing.joinedAt) < new Date(current.joinedAt)
            ? longestServing
            : current;
        });

        await db
          .collection<Organization>("organizations")
          .updateOne(
            { _id: new ObjectId(orgId) },
            { $set: { ownerId: newOwner.userId }, $pull: { members: { userId: userId } } }
          );
      } else {
        throw new ForbiddenError("You cannot leave the organization.");
      }
    } else {
      // Non-primary owner/admin/member
      await db
        .collection<Organization>("organizations")
        .updateOne({ _id: new ObjectId(orgId) }, { $pull: { members: { userId: userId } } });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
