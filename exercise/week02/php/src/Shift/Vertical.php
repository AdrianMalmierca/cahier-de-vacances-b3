<?php

namespace Shift;

/*class Vertical
{
    public static function whichFloor(string $signalStream): int
    {
        $val = [];

        for ($i = 0; $i < strlen($signalStream); $i++) {
            $c = $signalStream[$i];

            if (strpos($signalStream, "🧝")) {
                $j = ($c === ')') ? 3 : -2;
                $val[] = [$c, $j];
            } else if (strpos($signalStream, "🧝") === false) {
                $val[] = [$c, ($c === '(') ? 1 : -1];
            } else {
                $val[] = [$c, ($c === '(') ? 42 : -2];
            }
        }

        $result = 0;
        foreach ($val as $kp) {
            $result += $kp[1];
        }

        return $result;
    }
}*/

class Vertical
{
    private const UP_SIGNAL = '(';
    private const DOWN_SIGNAL = ')';
    private const ANOMALY_SIGNAL = '🧝';

    public static function whichFloor(string $signalStream): int
    {
        return str_contains($signalStream, self::ANOMALY_SIGNAL)
            ? self::whichFloorUnderAnomaly($signalStream)
            : self::whichFloorNormally($signalStream);
    }

    private static function whichFloorNormally(string $signalStream): int
    {
        $floor = 0;
        //mb_str_split is used to handle multibyte characters correctly, such as emojis
        //with str_split, the emoji would be split into multiple characters, which is not what we want
        foreach (mb_str_split($signalStream) as $signal) {
            if ($signal === self::UP_SIGNAL) $floor += 1;
            elseif ($signal === self::DOWN_SIGNAL) $floor -= 1;
            else $floor += 0; 
        }
        return $floor;
    }

    private static function whichFloorUnderAnomaly(string $signalStream): int
    {
        $floor = 0;
        foreach (mb_str_split($signalStream) as $signal) {
            if ($signal === self::DOWN_SIGNAL) $floor += 3;
            elseif ($signal === self::UP_SIGNAL) $floor -= 2;
        }
        return $floor;
    }
}