import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import cors from "cors";
import "./db/database";
import { validatePassword } from "./validation/passwordValidator";
import { logAttempt } from "./logging/attemptLogger";

//Rebuild the app without app.listen()
function buildApp() {
    const app = express();
    app.use(cors());
    app.use(express.json({ limit: "1kb" }));

    app.post("/api/password-check", (req, res) => {
        const { password } = req.body;
        if (typeof password !== "string") {
            return res.status(400).json({ isValid: false, errors: ["Password must be a string"], ruleResults: [] });
        }
        const result = validatePassword(password);
        logAttempt(password, result);
        return res.status(200).json(result);
    });

    return app;
}

describe("POST /api/password-check", () => {
    const app = buildApp();

    it("returns 200 and isValid true for a compliant password", async () => {
        const response = await request(app)
            .post("/api/password-check")
            .send({ password: "Abc123@#" });

        expect(response.status).toBe(200);
        expect(response.body.isValid).toBe(true);
    });

    it("returns 400 when password is missing or not a string", async () => {
        const response = await request(app)
            .post("/api/password-check")
            .send({ password: 12345 });

        expect(response.status).toBe(400);
        expect(response.body.isValid).toBe(false);
    });
});