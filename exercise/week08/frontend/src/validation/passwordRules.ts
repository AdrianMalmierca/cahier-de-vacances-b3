export type RuleId = "length" | "uppercase" | "lowercase" | "number" | "symbol" | "forbidden";

export interface Rule {
    id: RuleId;
    label: string;
    test: (password: string) => boolean;
}

const ALLOWED_SYMBOLS = ".*#@$%&";
const ALLOWED_CHARS_REGEX = new RegExp(`^[A-Za-z0-9${ALLOWED_SYMBOLS.replace(/[.*]/g, "\\$&")}]*$`);
//{ALLOWED_SYMBOLS.replace(/[.*]/g, "\\$&")}]*$` to transform special symbols into a regex-safe format,
// ensuring they are treated as literal characters in the character class.
//g means global, so it replaces all occurrences of . and * in the ALLOWED_SYMBOLS string with their escaped versions \. and \*.
//\\$& means add a slash before the text found

export const rules: Rule[] = [
    {
        id: "length",
        label: "At least 8 characters",
        test: (password) => password.length >= 8,
    },
    {
        id: "uppercase",
        label: "At least 1 uppercase glyph (A-Z)",
        test: (password) => /[A-Z]/.test(password),
    },
    {
        id: "lowercase",
        label: "At least 1 lowercase glyph (a-z)",
        test: (password) => /[a-z]/.test(password),
    },
    {
        id: "number",
        label: "At least 1 number (0-9)",
        test: (password) => /[0-9]/.test(password),
    },
    {
        id: "symbol",
        label: `At least 1 cyber-symbol: ${ALLOWED_SYMBOLS.split("").join(" ")}`,
        test: (password) => new RegExp(`[${ALLOWED_SYMBOLS.replace(/[.*]/g, "\\$&")}]`).test(password),
    },
    {
        id: "forbidden",
        label: "No unauthorized glyphs (only letters, numbers, and cyber-symbols)",
        test: (password) => ALLOWED_CHARS_REGEX.test(password),
    },
];

export const errorMessages: Record<RuleId, string> = {
    length: "Too short",
    uppercase: "Needs at least 1 uppercase",
    lowercase: "Needs at least 1 lowercase",
    number: "Needs at least 1 number",
    symbol: "Include at least one of . * # @ $ % &",
    forbidden: "Unauthorized glyph detected!",
};

export interface ValidationResult {
    isValid: boolean;
    failedRules: RuleId[];
}

export function validatePassword(password: string): ValidationResult {
    const failedRules = rules
        .filter((rule) => !rule.test(password)) //keeps failed rules
        .map((rule) => rule.id); //extracts the ids of the failed rules

    return {
        isValid: failedRules.length === 0, //true if no failed rules, false otherwise
        failedRules,
    };
}