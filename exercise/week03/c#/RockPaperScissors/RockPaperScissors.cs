namespace RockPaperScissors;

public enum Choice
{
    Rock,
    Paper,
    Scissors,
    Lizard,
    Spock
}

public enum Winner
{
    Player1,
    Player2,
    Draw
}

public record Result(Winner Winner, string Reason);

public static class RockPaperScissors
{
    private static readonly Dictionary<Choice, Dictionary<Choice, string>> Rules = new()
    {
        [Choice.Rock] = new()
        {
            [Choice.Scissors] = "rock crushes scissors",
            [Choice.Lizard] = "rock crushes lizard"
        },
        [Choice.Paper] = new()
        {
            [Choice.Rock] = "paper covers rock",
            [Choice.Spock] = "paper disproves spock"
        },
        [Choice.Scissors] = new()
        {
            [Choice.Paper] = "scissors cuts paper",
            [Choice.Lizard] = "scissors decapitates lizard"
        },
        [Choice.Lizard] = new()
        {
            [Choice.Spock] = "lizard poisons spock",
            [Choice.Paper] = "lizard eats paper"
        },
        [Choice.Spock] = new()
        {
            [Choice.Scissors] = "spock smashes scissors",
            [Choice.Rock] = "spock vaporizes rock"
        }
    };

    public static Result Play(Choice player1, Choice player2)
    {
        if (player1 == player2)
            return new Result(Winner.Draw, "same choice");

        //Rules[player1] is a dictionary that contains the choices that player1 beats and the reasons why
        //TryGetValue is a method that tries to get the value associated with the key player2 in the dictionary Rules[player1]
        //is like, if player1 is Rock, then check if player2 is Scissors or Lizard, if yes, then player1 wins, if not, then player2 wins
        if (Rules[player1].TryGetValue(player2, out var reason))
            return new Result(Winner.Player1, reason); //here only player1 wins

        return new Result(Winner.Player2, Rules[player2][player1]);
    }
}