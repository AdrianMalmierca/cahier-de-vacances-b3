<?php

//namespace Construct;

//class ConstructInventory
//{
    
    ///** @var Artefact[] */
    /*private array $artefacts;

    public function __construct(array $artefacts)
    {
        $this->artefacts = $artefacts;
    }

    public function updateSimulation(): void
    {
        foreach ($this->artefacts as $artefact) {
            if ($artefact->name !== "Aged Signal" &&
                $artefact->name !== "Backdoor Pass to TAFKAL80ETC Protocol") {

                if ($artefact->integrity > 0 && $artefact->name !== "Sulfuras Core Fragment") {
                    $artefact->integrity--;
                }

            } else {
                if ($artefact->integrity < 50) {
                    $artefact->integrity++;

                    if ($artefact->name === "Backdoor Pass to TAFKAL80ETC Protocol") {
                        if ($artefact->timeToLive < 11 && $artefact->integrity < 50) {
                            $artefact->integrity++;
                        }
                        if ($artefact->timeToLive < 6 && $artefact->integrity < 50) {
                            $artefact->integrity++;
                        }
                    }
                }
            }

            if ($artefact->name !== "Sulfuras Core Fragment") {
                $artefact->timeToLive--;
            }

            if ($artefact->timeToLive < 0) {
                if ($artefact->name !== "Aged Signal") {
                    if ($artefact->name !== "Backdoor Pass to TAFKAL80ETC Protocol") {
                        if ($artefact->integrity > 0 && $artefact->name !== "Sulfuras Core Fragment") {
                            $artefact->integrity--;
                        }
                    } else {
                        $artefact->integrity = 0;
                    }
                } elseif ($artefact->integrity < 50) {
                    $artefact->integrity++;
                }
            }
        }
    }

    public function getArtefacts(): array
    {
        return $this->artefacts;
    }
}
*/  

namespace Construct;

class ConstructInventory
{
    /** @var Artefact[] */
    private array $artefacts;

    public function __construct(array $artefacts)
    {
        $this->artefacts = $artefacts;
    }

    public function updateSimulation(): void
    {
        foreach ($this->artefacts as $artefact) {
            ArtefactUpdaterFactory::forArtefact($artefact->name)->update($artefact);
        }
    }

    public function getArtefacts(): array
    {
        return $this->artefacts;
    }
}