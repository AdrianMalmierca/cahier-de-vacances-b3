export type Choice = "🪨" | "📄" | "✂️" | "🦎" | "🖖";
export type Winner = "Player 1" | "Player 2" | "Draw";
export type Result = {
    winner: Winner,
    reason: string
};

//Partial<Record<Choice, string>> means that for each Choice, the value can be a string or undefined.
// This is useful for representing the rules of the game, where not every choice has a winning condition against 
// every other choice.
const RULES: Record<Choice, Partial<Record<Choice, string>>> = {
    "🪨": { "✂️": "rock crushes scissors", "🦎": "rock crushes lizard" },
    "📄": { "🪨": "paper covers rock", "🖖": "paper disproves spock" },
    "✂️": { "📄": "scissors cuts paper", "🦎": "scissors decapitates lizard" },
    "🦎": { "🖖": "lizard poisons spock", "📄": "lizard eats paper" },
    "🖖": { "✂️": "spock smashes scissors", "🪨": "spock vaporizes rock" },
};

export class RockPaperScissors {
    static play(player1: Choice, player2: Choice): Result {
        if (player1 === player2) return { winner: "Draw", reason: "same choice" };

        const reason = RULES[player1][player2];
        if (reason) return { winner: "Player 1", reason };

        return { winner: "Player 2", reason: RULES[player2][player1]! };
    }
}