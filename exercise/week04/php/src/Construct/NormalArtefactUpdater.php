<?php

namespace Construct;

class NormalArtefactUpdater implements ArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        $this->decrease($artefact, 1);
        $artefact->timeToLive--;
        if ($artefact->timeToLive < 0) {
            $this->decrease($artefact, 1);
        }
    }

    protected function decrease(Artefact $artefact, int $amount): void
    {
        $artefact->integrity = max(0, $artefact->integrity - $amount);
    }

    protected function increase(Artefact $artefact, int $amount): void
    {
        $artefact->integrity = min(50, $artefact->integrity + $amount);
    }
}