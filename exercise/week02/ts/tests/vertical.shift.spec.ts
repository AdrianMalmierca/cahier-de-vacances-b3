import * as fs from "node:fs";
import { Vertical } from "../src/shift/vertical";
import * as path from "node:path";

describe('Vertical Shift', () => {
    test.each([
        ["1", 0],
        ["2", 3],
        ["3", -1],
        ["4", 53],
        ["5", -3],
        ["6", 2920]
    ])('returns the correct floor number based on instructions in file %s', (fileName, expectedFloor) => {
        const instructions = fs.readFileSync(path.join(__dirname,`shifts/${fileName}.txt`), 'utf-8');
        const result = Vertical.whichFloor(instructions);
        expect(result).toBe(expectedFloor);
    });
});
