package neural;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class SubmarineTests {

    @Test
    void should_compute_example_from_mission() {
        List<String> lines = List.of(
                "forward 5",
                "down 5",
                "forward 8",
                "up 3",
                "down 8",
                "forward 2"
        );

        Submarine submarine = new Submarine();
        submarine.executeAll(lines);

        assertThat(submarine.getHorizontal()).isEqualTo(15);
        assertThat(submarine.getDepth()).isEqualTo(10);
        assertThat(submarine.finalPosition()).isEqualTo(150);
    }

    @Test
    void should_move_on_given_instructions() throws IOException {
        InputStream is = getClass().getResourceAsStream("/submarine.txt"); // Load the submarine.txt file from the resources folder
        String content = new String(is.readAllBytes(), StandardCharsets.UTF_8); // Read the content of the file as a string
        List<String> lines = content.lines().toList();

        Submarine submarine = new Submarine();
        submarine.executeAll(lines);

        int result = submarine.finalPosition();

        System.out.println("Horizontal: " + submarine.getHorizontal());
        System.out.println("Depth: " + submarine.getDepth());
        System.out.println("Access Coordinate: " + result);

        assertThat(result).isGreaterThan(0);
    }
}