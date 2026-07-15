<?php

class Submarine
{
    public int $horizontal = 0;
    public int $depth = 0;

    public function execute(string $command): void
    {
        [$action, $value] = explode(' ', $command);
        $value = (int) $value;

        match ($action) {
            'forward' => $this->horizontal += $value,
            'down' => $this->depth += $value,
            'up' => $this->depth -= $value,
            default => null,
        };
    }

    public function executeAll(array $commands): void
    {
        foreach ($commands as $command) {
            if (trim($command) !== '') {
                $this->execute($command);
            }
        }
    }

    public function finalPosition(): int
    {
        return $this->horizontal * $this->depth;
    }
}