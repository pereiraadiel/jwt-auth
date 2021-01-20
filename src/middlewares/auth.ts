import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import token from "../config/token";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

interface tokenResponse {
  id: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "No token provided",
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length === 2) {
    const [scheme, jwtoken] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        error: "Token malformatted",
      });
    }

    try {
      const data = (await token.verify(jwtoken)) as tokenResponse;
      if (data) {
        req.userId = data.id;
        next();
      } else {
        return res.status(401).json({
          error: "Token invalid",
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({
          error: "Token expired",
        });
      }
      return res.status(401).json({
        error: "Token error",
      });
    }
  } else {
    return res.status(401).json({
      error: "Token error",
    });
  }
};
