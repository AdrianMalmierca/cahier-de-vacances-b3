export interface RuleResult {
    id: string;
    passed: boolean;
    message: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    ruleResults: RuleResult[];
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api/password-check";
const TIMEOUT_MS = 5000;

export type CheckOutcome =
    | { status: "success"; result: ValidationResult }
    | { status: "timeout" }
    | { status: "network-error" }
    | { status: "server-error"; statusCode: number };

export async function checkPassword(password: string): Promise<CheckOutcome> {
    const controller = new AbortController(); //to allow us to cancel the fetch request if it takes too long
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
            signal: controller.signal, //associate the fetch request with the AbortController, so we can cancel it if it takes too long
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return { status: "server-error", statusCode: response.status };
        }

        const result: ValidationResult = await response.json();
        return { status: "success", result };
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof DOMException && error.name === "AbortError") {
            return { status: "timeout" };
        }

        return { status: "network-error" };
    }
}