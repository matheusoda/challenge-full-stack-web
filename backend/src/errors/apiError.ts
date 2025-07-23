export class ApiError extends Error {
	public readonly statusCode: number;
	public readonly errors?: Array<{ path: string; message: string }>;

	constructor(message: string, statusCode = 400, errors?: Array<{ path: string; message: string }>) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends ApiError {
	constructor(message = "Recurso não encontrado") {
		super(message, 404);
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message = "Não autorizado") {
		super(message, 401);
	}
}

export class ConflictError extends ApiError {
	constructor(message = "Conflito de dados") {
		super(message, 409);
	}
}