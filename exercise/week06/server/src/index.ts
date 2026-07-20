import express, { type Request, type Response } from "express";
import cors from "cors";
import { validatePassword } from "./validation/passwordRules";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json({ limit: "1kb" })); //low limit: a password should never be too long, and this prevents abuse of the endpoint

interface PasswordCheckBody {
    password?: unknown;
}
//on the request theres no params on the url, no query string, and the body is of type PasswordCheckBody
app.post("/api/password-check", (req: Request<{}, {}, PasswordCheckBody>, res: Response) => {
    const { password } = req.body;

    //Password must exist and be a string, otherwise return a 400 Bad Request with an error message,
    //instead of letting it break the validation logic (defensive programming).
    if (typeof password !== "string") {
        return res.status(400).json({
            isValid: false,
            errors: ["Password must be a string"],
            ruleResults: [],
        });
    }

    const result = validatePassword(password);
    return res.status(200).json(result);
});

app.listen(PORT, () => {
    console.log(`Zion's Validation Core listening on port ${PORT}`);
});