import { StudentService } from "../services/studentService.js";

import { z } from "zod";

export async function getStudents(req, res) {
    try {
        const students = await StudentService.getAllStudent();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
}

export async function getStudentById(req, res) {
    try {
        const { id } = req.params;
        const students = await StudentService.getStudentById(id);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching student" });
    }
}

export async function createStudent(req, res) {
    const { name, email, ra, cpf} = req.body;

    try {
        const validation = studentSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const students = await StudentService.getAllStudent();
        const emailAlreadyRegister = students.filter(
            (student) => student.email === email
        );

        if (emailAlreadyRegister.length) {
            res.status(400).json({ error: "E-mail already in use" });
            return;
        }

        const newStudent = await StudentService.createStudent(
            name,
            email,
            ra, 
            cpf
        );
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: "Error creating student" });
    }
}

export async function updateStudent(req, res) {
    const { id } = req.params;
    const { name, email, ra, cpf } = req.body;

    try {
        const validation = studentUpdateSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const newStudent = await StudentService.updateStudent(id, {
            name,
            email,
            ra, 
            cpf
        });
        res.status(201).json(newStudent);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Error creating student" });
    }
}

export async function deleteStudent(req, res) {
    const { id } = req.params;

    try {
        await StudentService.deleteStudent(id);

        res.status(200).json("Success delete student");
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Error creating student" });
    }
}

const studentSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    ra: z.string().min(),
    cpf: z.string().optional()
});

const studentUpdateSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    ra: z.string().optional(),
    cpf: z.string().optional()
});
