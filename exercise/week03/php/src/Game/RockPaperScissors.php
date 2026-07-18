<?php

namespace Game;

class RockPaperScissors
{
    private const RULES = [
        '🪨' => [
            '✂️' => 'rock crushes scissors',
            '🦎' => 'rock crushes lizard',
        ],
        '📄' => [
            '🪨' => 'paper covers rock',
            '🖖' => 'paper disproves spock',
        ],
        '✂️' => [
            '📄' => 'scissors cuts paper',
            '🦎' => 'scissors decapitates lizard',
        ],
        '🦎' => [
            '🖖' => 'lizard poisons spock',
            '📄' => 'lizard eats paper',
        ],
        '🖖' => [
            '✂️' => 'spock smashes scissors',
            '🪨' => 'spock vaporizes rock',
        ],
    ];

    public static function play(string $player1, string $player2): array
    {
        if ($player1 === $player2) {
            return ['winner' => 'Draw', 'reason' => 'same choice'];
        }

        if (isset(self::RULES[$player1][$player2])) {
            return ['winner' => 'Player 1', 'reason' => self::RULES[$player1][$player2]];
        }

        return ['winner' => 'Player 2', 'reason' => self::RULES[$player2][$player1]];
    }
}