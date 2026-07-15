export class Submarine {
    horizontal = 0;
    depth = 0;

    execute(command: string): void {
        const [action, valueStr] = command.split(' ');
        const value = parseInt(valueStr, 10);

        switch (action) {
            case 'forward':
                this.horizontal += value;
                break;
            case 'down':
                this.depth += value;
                break;
            case 'up':
                this.depth -= value;
                break;
        }
    }

    executeAll(commands: string[]): void {
        for (const command of commands) {
            if (command && command.trim() !== '') {
                this.execute(command);
            }
        }
    }

    finalPosition(): number {
        return this.horizontal * this.depth;
    }
}