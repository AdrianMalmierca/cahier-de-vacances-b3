package neural;

import java.util.List;

public class Submarine {
    private int horizontal = 0;
    private int depth = 0;

    public void execute(String command) {
        String[] parts = command.split(" ");
        String action = parts[0];
        int value = Integer.parseInt(parts[1]);

        switch (action) {
            case "forward":
                horizontal += value;
                break;
            case "down":
                depth += value;
                break;
            case "up":
                depth -= value;
                break;
        }
    }

    public void executeAll(List<String> commands) {
        for (String command : commands) {
            if (command != null && !command.isBlank()) {
                execute(command);
            }
        }
    }

    public int getHorizontal() {
        return horizontal;
    }

    public int getDepth() {
        return depth;
    }

    public int finalPosition() {
        return horizontal * depth;
    }
}