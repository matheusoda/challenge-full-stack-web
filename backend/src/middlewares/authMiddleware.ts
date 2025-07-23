// src/middleware/authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/apiError";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError("Token não fornecido");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = authService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        next(err);
    }
}
