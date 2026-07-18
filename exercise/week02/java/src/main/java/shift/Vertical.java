package shift;

/*import java.util.ArrayList;
import java.util.List;

public class Vertical {
    public static int whichFloor(String signalStream) {
        List<Pair<Character, Integer>> val = new ArrayList<>();

        for (int i = 0; i < signalStream.length(); i++) {
            char c = signalStream.charAt(i);

            if (signalStream.contains("🧝")) {
                int j;
                if (c == ')') j = 3;
                else j = -2;

                val.add(new Pair<>(c, j));
            } else if (!signalStream.contains("🧝")) {
                val.add(new Pair<>(c, c == '(' ? 1 : -1));
            } else {
                val.add(new Pair<>(c, c == '(' ? 42 : -2));
            }
        }

        int result = 0;
        for (Pair<Character, Integer> kp : val) {
            result += kp.value();
        }

        return result;
    }

    public record Pair<K, V>(K key, V value) {
    }
}
*/

public class Vertical {
    private static final char UP_SIGNAL = '('; //static cause we dont do new Vertical() to create an instance of the class, we just call the static method whichFloor
    private static final char DOWN_SIGNAL = ')';
    private static final String ANOMALY_SIGNAL = "🧝";

    //static methods cause they dont use instance variables, they just use the parameters passed to them 
    public static int whichFloor(String signalStream) {
        return signalStream.contains(ANOMALY_SIGNAL)
                ? whichFloorUnderAnomaly(signalStream)
                : whichFloorNormally(signalStream);
    }

    private static int whichFloorNormally(String signalStream) {
        int floor = 0;
        for (int i = 0; i < signalStream.length(); i++) {
            char signal = signalStream.charAt(i);
            if (signal == UP_SIGNAL) floor += 1;
            else if (signal == DOWN_SIGNAL) floor -= 1;
            else floor += 0;
        }
        return floor;
    }

    private static int whichFloorUnderAnomaly(String signalStream) {
        int floor = 0;
        for (int i = 0; i < signalStream.length(); i++) {
            char signal = signalStream.charAt(i);
            if (signal == DOWN_SIGNAL) floor += 3;
            else if (signal == UP_SIGNAL) floor -= 2;
        }
        return floor;
    }
}