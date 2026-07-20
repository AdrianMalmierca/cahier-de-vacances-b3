<?php

namespace Construct;

class AgedSignalUpdater extends NormalArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        $this->increase($artefact, 1);
        $artefact->timeToLive--;
        if ($artefact->timeToLive < 0) {
            $this->increase($artefact, 1);
        }
    }
}