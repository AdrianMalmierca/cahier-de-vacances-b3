namespace Neural
{
    public class Submarine
    {
        public int Horizontal { get; private set; } = 0;
        public int Depth { get; private set; } = 0;

        public void Execute(string command)
        {
            var parts = command.Split(' ');
            var action = parts[0];
            var value = int.Parse(parts[1]);

            switch (action)
            {
                case "forward":
                    Horizontal += value;
                    break;
                case "down":
                    Depth += value;
                    break;
                case "up":
                    Depth -= value;
                    break;
            }
        }

        //IEnumerable<string> is a more general type than string[], allowing for more flexibility in the input
        public void ExecuteAll(IEnumerable<string> commands)
        {
            foreach (var command in commands)
            {
                if (!string.IsNullOrWhiteSpace(command))
                    Execute(command);
            }
        }

        public int FinalPosition() => Horizontal * Depth;

    }
}
