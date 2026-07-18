package game;

import java.util.EnumMap;
import java.util.Map;

public class RockPaperScissors {
    private static final Map<Choice, Map<Choice, String>> RULES = new EnumMap<>(Choice.class);

    static {
        RULES.put(Choice.ROCK, Map.of(
                Choice.SCISSORS, "rock crushes scissors",
                Choice.LIZARD, "rock crushes lizard"
        ));
        RULES.put(Choice.PAPER, Map.of(
                Choice.ROCK, "paper covers rock",
                Choice.SPOCK, "paper disproves spock"
        ));
        RULES.put(Choice.SCISSORS, Map.of(
                Choice.PAPER, "scissors cuts paper",
                Choice.LIZARD, "scissors decapitates lizard"
        ));
        RULES.put(Choice.LIZARD, Map.of(
                Choice.SPOCK, "lizard poisons spock",
                Choice.PAPER, "lizard eats paper"
        ));
        RULES.put(Choice.SPOCK, Map.of(
                Choice.SCISSORS, "spock smashes scissors",
                Choice.ROCK, "spock vaporizes rock"
        ));
    }

    private RockPaperScissors() {
    }

    public static Result play(Choice player1, Choice player2) {
        if (player1 == player2) return new Result(Winner.DRAW, "same choice");

        String reason = RULES.get(player1).get(player2);
        if (reason != null) return new Result(Winner.PLAYER_1, reason);

        return new Result(Winner.PLAYER_2, RULES.get(player2).get(player1));
    }
}