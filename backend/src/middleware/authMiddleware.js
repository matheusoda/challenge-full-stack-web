// src/middleware/authMiddleware.ts
import authService from "../services/authService.js"; // Importe o authService com a função verifyToken

export function authMiddleware(req, res, next) {
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
