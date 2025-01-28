const express = require('express');
const Student = require('./models/Student');

const router = express.Router();

// Listar todos os alunos
router.get('/students', async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

// Criar aluno
router.post('/students', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Atualizar aluno
router.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });

        await student.update(req.body);
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Excluir aluno
router.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });

        await student.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
