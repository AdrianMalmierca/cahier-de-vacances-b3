import { defineConfig } from "vitest/config";

//to force NODE_ENV=test during tests
export default defineConfig({
    test: {
        env: {
            NODE_ENV: "test",
        },
    },
});