<?php

namespace Construct;

class ArtefactUpdaterFactory
{
    private const AGED_SIGNAL = "Aged Signal";
    private const BACKDOOR_PASS = "Backdoor Pass to TAFKAL80ETC Protocol";
    private const SULFURAS_CORE = "Sulfuras Core Fragment";
    private const STEALTH_CLOAK = "Stealth Cloak v2.0";

    public static function forArtefact(string $name): ArtefactUpdater
    {
        return match ($name) {
            self::AGED_SIGNAL => new AgedSignalUpdater(),
            self::BACKDOOR_PASS => new BackdoorPassUpdater(),
            self::SULFURAS_CORE => new SulfurasUpdater(),
            self::STEALTH_CLOAK => new StealthCloakUpdater(),
            default => new NormalArtefactUpdater(),
        };
    }
}