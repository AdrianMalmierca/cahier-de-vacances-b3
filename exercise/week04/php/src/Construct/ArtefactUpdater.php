<?php

namespace Construct;

interface ArtefactUpdater
{
    public function update(Artefact $artefact): void;
}