import { createHash } from "crypto";
import { db } from "../db/database";
import type { ValidationResult } from "../validation/passwordValidator";

const insertAttempt = db.prepare(`
    INSERT INTO attempts (password_hash, is_valid, result_json)
    VALUES (@passwordHash, @isValid, @resultJson)
`);

export function logAttempt(password: string, result: ValidationResult): void {
    const passwordHash = createHash("sha256").update(password).digest("hex"); //transform the password into sha256
    //to dont save the real password and into hex to be able to save into sqlite

    insertAttempt.run({
        passwordHash,
        isValid: result.isValid ? 1 : 0,
        resultJson: JSON.stringify(result.ruleResults),
    });
}