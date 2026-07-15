import { readFileSync } from 'fs';
import * as path from 'path';
import { Submarine } from '../Submarine';

describe('submarine should move', () => {
    test('example from mission', () => {
        const lines = [
            'forward 5',
            'down 5',
            'forward 8',
            'up 3',
            'down 8',
            'forward 2',
        ];

        const submarine = new Submarine();
        submarine.executeAll(lines);

        expect(submarine.horizontal).toBe(15);
        expect(submarine.depth).toBe(10);
        expect(submarine.finalPosition()).toBe(150);
    });

    test('on given text instructions', () => {
        const filePath = path.join(__dirname, 'submarine.txt');
        const lines = readFileSync(filePath, 'utf-8')
            .split('\n')
            .filter((line) => line.trim() !== '');

        const submarine = new Submarine();
        submarine.executeAll(lines);

        const result = submarine.finalPosition();

        console.log(`Horizontal: ${submarine.horizontal}`);
        console.log(`Depth: ${submarine.depth}`);
        console.log(`Access Coordinate: ${result}`);

        expect(result).toBeGreaterThan(0);
    });
});