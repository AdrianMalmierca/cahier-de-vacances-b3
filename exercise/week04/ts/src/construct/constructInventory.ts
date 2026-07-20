/*import { Artefact } from "./artefact";

export class ConstructInventory {
    private artefacts: Artefact[];

    constructor(artefacts: Artefact[]) {
        this.artefacts = artefacts;
    }

    updateSimulation(): void {
        for (const artefact of this.artefacts) {
            if (
                artefact.name !== "Aged Signal" &&
                artefact.name !== "Backdoor Pass to TAFKAL80ETC Protocol"
            ) {
                if (artefact.integrity > 0 && artefact.name !== "Sulfuras Core Fragment") {
                    artefact.integrity--;
                }
            } else {
                if (artefact.integrity < 50) {
                    artefact.integrity++;

                    if (artefact.name === "Backdoor Pass to TAFKAL80ETC Protocol") {
                        if (artefact.timeToLive < 11 && artefact.integrity < 50) {
                            artefact.integrity++;
                        }
                        if (artefact.timeToLive < 6 && artefact.integrity < 50) {
                            artefact.integrity++;
                        }
                    }
                }
            }

            if (artefact.name !== "Sulfuras Core Fragment") {
                artefact.timeToLive--;
            }

            if (artefact.timeToLive < 0) {
                if (artefact.name !== "Aged Signal") {
                    if (artefact.name !== "Backdoor Pass to TAFKAL80ETC Protocol") {
                        if (artefact.integrity > 0 && artefact.name !== "Sulfuras Core Fragment") {
                            artefact.integrity--;
                        }
                    } else {
                        artefact.integrity = 0;
                    }
                } else {
                    if (artefact.integrity < 50) {
                        artefact.integrity++;
                    }
                }
            }
        }
    }

    getArtefacts(): Artefact[] {
        return this.artefacts;
    }
}*/

import { Artefact } from "./artefact";
import { updaterFor } from "./artefactUpdaterFactory";

export class ConstructInventory {
    private artefacts: Artefact[];

    constructor(artefacts: Artefact[]) {
        this.artefacts = artefacts;
    }

    updateSimulation(): void {
        for (const artefact of this.artefacts) {
            updaterFor(artefact.name).update(artefact);
        }
    }

    getArtefacts(): Artefact[] {
        return this.artefacts;
    }
}