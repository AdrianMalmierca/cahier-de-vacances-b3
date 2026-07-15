using FluentAssertions;
using Xunit;
using Xunit.Abstractions;

namespace Neural.Tests
{
    public class SubmarineTests
    {
        private readonly ITestOutputHelper _output; //to be able to write to the console in xUnit, _ to indicate that this is a private field

        public SubmarineTests(ITestOutputHelper output)
        {
            _output = output; //initialize the output helper
        }

        [Fact] //fact is an attribute that marks a method as a test method in xUnit
        public void Should_Compute_Example_From_Mission()
        {
            var lines = new[]
            {
                "forward 5",
                "down 5",
                "forward 8",
                "up 3",
                "down 8",
                "forward 2"
            };

            var submarine = new Submarine();
            submarine.ExecuteAll(lines);

            submarine.Horizontal.Should().Be(15);
            submarine.Depth.Should().Be(10);
            submarine.FinalPosition().Should().Be(150);
        }

        [Fact]
        public void Should_Move_On_Given_Text_Instructions()
        {
            var lines = File.ReadAllLines("submarine.txt");

            var submarine = new Submarine();
            submarine.ExecuteAll(lines);

            var result = submarine.FinalPosition();

            _output.WriteLine($"Horizontal: {submarine.Horizontal}");
            _output.WriteLine($"Depth: {submarine.Depth}");
            _output.WriteLine($"Access Coordinate (horizontal x depth): {result}");

            result.Should().BeGreaterThan(0);
        }
    }
}