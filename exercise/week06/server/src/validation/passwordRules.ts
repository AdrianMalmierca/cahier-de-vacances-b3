export type RuleId = "length" | "uppercase" | "lowercase" | "number" | "symbol" | "forbidden";

export interface Rule {
    id: RuleId;
    message: string;
    test: (password: string) => boolean;
}

const ALLOWED_SYMBOLS = ".*#@$%&";
const ESCAPED_SYMBOLS = ALLOWED_SYMBOLS.replace(/[.*]/g, "\\$&");
const ALLOWED_CHARS_REGEX = new RegExp(`^[A-Za-z0-9${ESCAPED_SYMBOLS}]*$`);
const SYMBOL_REGEX = new RegExp(`[${ESCAPED_SYMBOLS}]`);

export const rules: Rule[] = [
    {
        id: "length",
        message: "Password must be at least 8 characters long",
        test: (password) => password.length >= 8,
    },
    {
        id: "uppercase",
        message: "Needs at least 1 uppercase",
        test: (password) => /[A-Z]/.test(password),
    },
    {
        id: "lowercase",
        message: "Needs at least 1 lowercase",
        test: (password) => /[a-z]/.test(password),
    },
    {
        id: "number",
        message: "Needs at least 1 number",
        test: (password) => /[0-9]/.test(password),
    },
    {
        id: "symbol",
        message: "Include at least one of . * # @ $ % &",
        test: (password) => SYMBOL_REGEX.test(password),
    },
    {
        id: "forbidden",
        message: "Unauthorized glyph detected!",
        test: (password) => ALLOWED_CHARS_REGEX.test(password),
    },
];

export interface RuleResult {
    id: RuleId;
    passed: boolean;
    message: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    ruleResults: RuleResult[];
}

export function validatePassword(password: string): ValidationResult {
    const ruleResults: RuleResult[] = rules.map((rule) => ({
        id: rule.id,
        passed: rule.test(password),
        message: rule.message,
    }));

    const errors = ruleResults.filter((r) => !r.passed).map((r) => r.message);

    return {
        isValid: errors.length === 0,
        errors,
        ruleResults,
    };
}