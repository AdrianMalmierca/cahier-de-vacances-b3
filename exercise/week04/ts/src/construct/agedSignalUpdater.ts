import { Artefact } from "./artefact";
import { ArtefactUpdater, BaseArtefactUpdater } from "./artefactUpdater";

export class AgedSignalUpdater extends BaseArtefactUpdater implements ArtefactUpdater {
    update(artefact: Artefact): void {
        this.increase(artefact, 1);
        artefact.timeToLive--;
        if (artefact.timeToLive < 0) {
            this.increase(artefact, 1);
        }
    }
}