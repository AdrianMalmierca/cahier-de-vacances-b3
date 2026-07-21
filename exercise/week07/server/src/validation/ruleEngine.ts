export type RuleKey = "length" | "uppercase" | "lowercase" | "number" | "symbol" | "forbidden";

const ALLOWED_SYMBOLS = ".*#@$%&";
const ESCAPED_SYMBOLS = ALLOWED_SYMBOLS.replace(/[.*]/g, "\\$&");
const ALLOWED_CHARS_REGEX = new RegExp(`^[A-Za-z0-9${ESCAPED_SYMBOLS}]*$`);
const SYMBOL_REGEX = new RegExp(`[${ESCAPED_SYMBOLS}]`);

//Each ruleKey has a unique test function written into the code, never generated dinamically
export const ruleTests: Record<RuleKey, (password: string) => boolean> = {
    length: (password) => password.length >= 8,
    uppercase: (password) => /[A-Z]/.test(password),
    lowercase: (password) => /[a-z]/.test(password),
    number: (password) => /[0-9]/.test(password),
    symbol: (password) => SYMBOL_REGEX.test(password),
    forbidden: (password) => ALLOWED_CHARS_REGEX.test(password),
};