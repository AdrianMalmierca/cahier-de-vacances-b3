<?php

use Behat\Behat\Context\Context;
use Behat\Step\Given;
use Behat\Step\When;
use Behat\Step\Then;
use Game\RockPaperScissors;

class FeatureContext implements Context
{
    private string $player1Choice;
    private string $player2Choice;
    private array $result;

    #[Given('/^Player (\d+) chooses (.*)$/')]
    public function playerChooses(int $player, string $choice): void
    {
        if ($player === 1) {
            $this->player1Choice = $choice;
        } else {
            $this->player2Choice = $choice;
        }
    }

    #[When('/^they play$/')]
    public function theyPlay(): void
    {
        $this->result = RockPaperScissors::play($this->player1Choice, $this->player2Choice);
    }

    #[Then('/^the result should be (.*) because (.*)$/')]
    public function theResultShouldBeBecause(string $expectedWinner, string $expectedReason): void
    {
        if ($this->result['winner'] !== $expectedWinner || $this->result['reason'] !== $expectedReason) {
            throw new \Exception(
                "Expected winner '$expectedWinner' with reason '$expectedReason', got '{$this->result['winner']}' with reason '{$this->result['reason']}'"
            );
        }
    }
}