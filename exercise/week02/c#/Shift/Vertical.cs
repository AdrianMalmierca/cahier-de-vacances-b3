namespace Shift;

/*public static class Vertical
{
    public static int WhichFloor(string signalStream)
    {
        List<Tuple<char, int>> val = []; //useless to use the Tuple, you can sum directly the values

        for (int i = 0; i < signalStream.Length; i++)
        {
            var c = signalStream[i];

            if (signalStream.Contains("🧝")) contains the emoji (50% of cases)
            {
                int j;
                if (c == ')') j = 3;
                else j = -2; the emoji is not an instruction, so it should be ignored, not counted as -2

                val.Add(new Tuple<char, int>(c, j));
            }
            else if (!signalStream.Contains("🧝")) doesnt contain the emoji (the other 50%)
            {
                val.Add(new Tuple<char, int>(c, c == '(' ? 1 : -1));
            }
            else val.Add(new Tuple<char, int>(c, c == '(' ? 42 : -2)); never executed
        }

        int result = 0;
        foreach (var kp in val)
        {
            result += kp.Item2;
        }
        return result;
    }
}*/

public static class Vertical
{
    private const char UpSignal = '(';
    private const char DownSignal = ')';
    private const string AnomalySignal = "🧝";

    public static int WhichFloor(string signalStream)
    {
        //Console.WriteLine($"Contains anomaly? {signalStream.Contains(AnomalySignal)}");
        //Console.WriteLine($"Signal length: {signalStream.Length}");
        return signalStream.Contains(AnomalySignal)
            ? WhichFloorUnderAnomaly(signalStream)
            : WhichFloorNormally(signalStream);
    }

    private static int WhichFloorNormally(string signalStream)
    {
        var floor = 0;
        foreach (var signal in signalStream)
        {
            floor += signal switch
            {
                UpSignal => 1,
                DownSignal => -1,
                _ => 0 //in case of any other character, we ignore it and add 0 to the floor
            };
        }
        return floor;
    }

    private static int WhichFloorUnderAnomaly(string signalStream)
    {
        var floor = 0;
        foreach (var signal in signalStream)
        {
            if (signal == DownSignal) floor += 3;
            else if (signal == UpSignal) floor -= 2;
        }
        return floor;
    }
}