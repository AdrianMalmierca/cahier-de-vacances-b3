import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MatrixBreach } from "./MatrixBreach";
import * as api from "../validation/passwordApi";

describe("MatrixBreach", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the breach key input", () => {
        render(<MatrixBreach />);
        //i to ignore uppercase and lowercase
        expect(screen.getByLabelText(/breach key/i)).toBeInTheDocument(); //check an input exist with the label breach key
    });

    it("shows Access Granted when the API confirms a valid password", async () => {
        vi.spyOn(api, "checkPassword").mockResolvedValue({
            status: "success",
            result: {
                isValid: true,
                errors: [],
                ruleResults: [
                    { id: "rule-length", passed: true, message: "Password must be at least 8 characters long" },
                ],
            },
        });

        const user = userEvent.setup();
        render(<MatrixBreach />);

        await user.type(screen.getByLabelText(/breach key/i), "Abc123@#"); //input simulated

        await waitFor(//wait for one condition
            () => expect(screen.getByText(/access granted/i)).toBeInTheDocument(), //check appears the text access granted
            { timeout: 2000 } //waits 2 seconds max
        );
    });

    it("shows a network error message when the backend is unreachable", async () => {
        vi.spyOn(api, "checkPassword").mockResolvedValue({ status: "network-error" });

        const user = userEvent.setup();
        render(<MatrixBreach />);

        await user.type(screen.getByLabelText(/breach key/i), "test");

        await waitFor(
            () => expect(screen.getByText(/connection severed/i)).toBeInTheDocument(),
            { timeout: 2000 }
        );
    });
});