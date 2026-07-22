import { describe, it, expect, vi, afterEach } from "vitest";
import { checkPassword } from "./passwordApi";

describe("checkPassword", () => {
    afterEach(() => {
        vi.restoreAllMocks(); //restore the mocks which existed in functions
        vi.unstubAllGlobals(); //undone the changes in vi.stubGlobal
    }); //so one test doesnt affect to the next one

    it("returns success with the parsed result when the API responds 200", async () => {
        const mockResult = { isValid: true, errors: [], ruleResults: [] };
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ //false fetch
            ok: true,
            json: () => Promise.resolve(mockResult),
        }));

        const outcome = await checkPassword("Abc123@#");

        expect(outcome).toEqual({ status: "success", result: mockResult });
    });

    it("returns server-error with the status code when the API responds with a non-2xx status", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
        }));

        const outcome = await checkPassword("Abc123@#");

        expect(outcome).toEqual({ status: "server-error", statusCode: 500 });
    });

    it("returns network-error when fetch rejects", async () => {
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(
            new Error("Failed to fetch")
        ));

        const outcome = await checkPassword("Abc123@#");

        expect(outcome).toEqual({ status: "network-error" });
    });

    it("returns timeout when the request is aborted", async () => {
        vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
            const error = new DOMException("The operation was aborted", "AbortError");
            return Promise.reject(error);
        }));

        const outcome = await checkPassword("Abc123@#");

        expect(outcome).toEqual({ status: "timeout" });
    });
});