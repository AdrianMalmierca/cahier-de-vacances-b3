import express, { type Request, type Response } from "express";
import cors from "cors";
import "./db/database"; // fuerza la inicialización de tablas al arrancar
import { validatePassword } from "./validation/passwordValidator";
import { logAttempt } from "./logging/attemptLogger";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json({ limit: "1kb" }));

interface PasswordCheckBody {
    password?: unknown;
}

app.post("/api/password-check", (req: Request<{}, {}, PasswordCheckBody>, res: Response) => {
    const { password } = req.body;

    if (typeof password !== "string") {
        return res.status(400).json({
            isValid: false,
            errors: ["Password must be a string"],
            ruleResults: [],
        });
    }

    const result = validatePassword(password);
    logAttempt(password, result);

    return res.status(200).json(result);
});

app.listen(PORT, () => {
    console.log(`Zion's Validation Core (Rule Matrix edition) listening on port ${PORT}`);
});