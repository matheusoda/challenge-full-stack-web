// src/controllers/authController.js
import authService from "../services/authService.js";

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const data = await authService.login(username, password);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Error login" });
    }
}
