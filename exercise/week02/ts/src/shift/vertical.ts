/*export class Vertical {
    static whichFloor(instructions: string): number {
        let val: Array<[string, number]> = [];

        for (let i = 0; i < instructions.length; i++) {
            const c = instructions[i];

            if (instructions.includes("🧝")) {
                const j = c === ')' ? 3 : -2;
                val.push([c, j]);
            } else if (!instructions.includes("🧝")) {
                val.push([c, c === '(' ? 1 : -1]);
            } else {
                val.push([c, c === '(' ? 42 : -2]);
            }
        }

        let result = 0;
        for (const kp of val) {
            result += kp[1];
        }

        return result;
    }
}*/

const UP_SIGNAL = '(';
const DOWN_SIGNAL = ')';
const ANOMALY_SIGNAL = '🧝';

export class Vertical {
    public static whichFloor(signalStream: string): number {
        return signalStream.includes(ANOMALY_SIGNAL)
            ? Vertical.whichFloorUnderAnomaly(signalStream)
            : Vertical.whichFloorNormally(signalStream);
    }

    private static whichFloorNormally(signalStream: string): number {
        let floor = 0;
        for (const signal of signalStream) {
            if (signal === UP_SIGNAL) floor += 1;
            else if (signal === DOWN_SIGNAL) floor -= 1;
        }
        return floor;
    }

    private static whichFloorUnderAnomaly(signalStream: string): number {
        let floor = 0;
        for (const signal of signalStream) {
            if (signal === DOWN_SIGNAL) floor += 3;
            else if (signal === UP_SIGNAL) floor -= 2;
        }
        return floor;
    }
}