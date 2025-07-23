import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/apiError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      errors: err.errors ?? null
    });
  }

  console.error("Unhandled Error:", err);
  return res.status(500).json({ error: "Erro interno do servidor" });
}