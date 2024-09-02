import { AuthorizationRequiredError } from "@/errors";
import { verifyToken } from "@/lib/jwt";
import type { NextFunction, Request, Response } from "express";

export type AuthenticatedRequest = Request & {
  user?: {
    id: string;
  };
};

export async function authHandler(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AuthorizationRequiredError();
    }

    const userId = await verifyToken(token);

    req.user = { id: userId };

    next();
  } catch (err) {
    next(new AuthorizationRequiredError());
  }
}
