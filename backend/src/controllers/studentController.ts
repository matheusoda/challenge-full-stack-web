import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/studentService";

import { z } from "zod";
import { Student } from "../../generated/prisma/index";
import { ApiError, ConflictError } from "../errors/apiError";

export async function getStudents(req: Request, res: Response, next: NextFunction) {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const search = (req.query.search as string) || '';

		const students = await StudentService.getPaginatedStudents(page, limit, search);

		res.json(students);
	} catch (error) {
		next(new ApiError("Erro ao buscar estudantes", 500));
	}
}

export async function getStudentById(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const students = await StudentService.getStudentById(id);
		res.json(students);
	} catch (error) {
		next(new ApiError("Erro ao buscar estudante", 500));
	}
}

export async function createStudent(req: Request, res: Response, next: NextFunction) {
	const { name, email, ra, cpf } = req.body;

	try {
		const validation = studentSchema.safeParse(req.body);
		if (!validation.success) {
			const errors = validation.error.issues.map((err) => ({
				path: err.path.join("."),
				message: err.message
			}))
			throw new ApiError("Erro de validação", 400, errors);
		}

		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const search = (req.query.search as string) || '';

		const students = await StudentService.getPaginatedStudents(page, limit, search);
		const emailAlreadyRegister = students.data.filter(
			(student: Student) => student.email === email
		);

		if (emailAlreadyRegister.length) {
			throw new ConflictError("E-mail já está em uso");
		}

		const newStudent = await StudentService.createStudent(
			name,
			email,
			ra,
			cpf
		);
		res.status(201).json(newStudent);
	} catch (err) {
		next(err);
	}
}

export async function updateStudent(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const { name, email, ra, cpf } = req.body;

	try {
		const validation = studentSchema.safeParse(req.body);

		if (!validation.success) {
			const errors = validation.error.issues.map((err) => ({
				path: err.path.join("."),
				message: err.message
			}))
			throw new ApiError("Erro de validação", 400, errors);
		}

		const newStudent = await StudentService.updateStudent(id, {
			name,
			email,
			ra,
			cpf
		});
		res.status(201).json(newStudent);
	} catch (err) {
		console.log("ERROR: ", err);
		next(err);
	}
}

export async function deleteStudent(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	try {
		await StudentService.deleteStudent(id);

		res.status(200).json("Success delete student");
	} catch (error) {
		console.log("ERROR: ", error);
		next(new ApiError("Erro ao excluir estudante", 500));
	}
}

const studentSchema = z.object({
	name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
	email: z.string().email("Formato de e-mail inválido."),
	ra: z.string(),
	cpf: z.string()
});
