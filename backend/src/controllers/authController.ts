// src/controllers/authController.js
import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import { ApiError } from "../errors/apiError";

export async function login(req: Request, res: Response, next: NextFunction) {
	const { email, password } = req.body;

	try {
		const data = await authService.login(email, password);
		res.status(200).json({ data });
	} catch (err) {
		console.log(err);
		next(new ApiError("Erro no login", 401));
	}
}
