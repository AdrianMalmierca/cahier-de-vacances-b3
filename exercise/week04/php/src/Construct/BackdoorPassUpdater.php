<?php

namespace Construct;

class BackdoorPassUpdater extends NormalArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        $this->increase($artefact, 1);
        if ($artefact->timeToLive < 11) $this->increase($artefact, 1);
        if ($artefact->timeToLive < 6) $this->increase($artefact, 1);

        $artefact->timeToLive--;

        if ($artefact->timeToLive < 0) {
            $artefact->integrity = 0;
        }
    }
}