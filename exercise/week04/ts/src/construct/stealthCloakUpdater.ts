import { Artefact } from "./artefact";
import { ArtefactUpdater } from "./artefactUpdater";

export class StealthCloakUpdater implements ArtefactUpdater {
    update(artefact: Artefact): void {
        artefact.timeToLive--;
        if (artefact.timeToLive % 2 === 0) {
            artefact.integrity = Math.max(0, artefact.integrity - 1);
        }
    }
}