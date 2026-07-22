import { describe, it, expect, beforeEach } from "vitest";
import { db } from "../db/database";
import { validatePassword } from "./passwordValidator";

describe("validatePassword", () => {
    beforeEach(() => {
        db.exec("UPDATE rules SET active = 1"); //active the rules to ensure clean state before tests
    });

    it("marks a password valid when it satisfies every active rule", () => {
        const result = validatePassword("Abc123@#");
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it("reports the specific rule that failed for a too-short password", () => {
        const result = validatePassword("Ab1@");
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain("Password must be at least 8 characters long");
    });

    it("ignores a rule once it has been deactivated", () => {
        db.exec("UPDATE rules SET active = 0 WHERE rule_key = 'symbol'"); //symbol rule desactivated

        const result = validatePassword("Abcdefg1"); //without symbol but is not compuldory anymore
        expect(result.ruleResults.some((r) => r.message.includes("cyber-symbol"))).toBe(false);
    });

    it("rejects passwords containing unauthorized glyphs", () => {
        const result = validatePassword("Abc123@# 😀");
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain("Unauthorized glyph detected!");
    });
});