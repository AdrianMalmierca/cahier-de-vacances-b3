<?php

namespace Construct;

class StealthCloakUpdater implements ArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        $artefact->timeToLive--;
        if ($artefact->timeToLive % 2 === 0) {
            $artefact->integrity = max(0, $artefact->integrity - 1);
        }
    }
}