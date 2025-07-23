// src/middleware/authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
  }

export function authMiddleware(req: AuthenticatedRequest , res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = authService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido ou expirado" });
        return;
    }
}
