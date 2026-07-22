import { describe, it, expect } from "vitest";
import { db } from "../db/database";
import { logAttempt } from "./attemptLogger";

describe("logAttempt", () => {
    it("stores a hashed password, never the raw value", () => {
        const rawPassword = "SuperSecret123@#";

        logAttempt(rawPassword, { isValid: true, errors: [], ruleResults: [] }); //save the password as valid

        const row = db
            .prepare("SELECT password_hash FROM attempts ORDER BY id DESC LIMIT 1")
            .get() as { password_hash: string }; //search the last (ORDER BT id DESC) valid intent, only 1 with the limit

        expect(row.password_hash).not.toBe(rawPassword); //check the password saved is not the original
        expect(row.password_hash).toHaveLength(64); //length of SHA-256 on hex
    });

    it("records the validity of the attempt", () => {
        logAttempt("whatever", { isValid: false, errors: ["Too short"], ruleResults: [] }); //saves a non valid intent

        const row = db
            .prepare("SELECT is_valid FROM attempts ORDER BY id DESC LIMIT 1")
            .get() as { is_valid: number };

        expect(row.is_valid).toBe(0); //check it wasnt saved
    });
});