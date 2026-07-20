import { Artefact } from "./artefact";
import { ArtefactUpdater, BaseArtefactUpdater } from "./artefactUpdater";

export class NormalArtefactUpdater extends BaseArtefactUpdater implements ArtefactUpdater {
    update(artefact: Artefact): void {
        this.decrease(artefact, 1);
        artefact.timeToLive--;
        if (artefact.timeToLive < 0) {
            this.decrease(artefact, 1);
        }
    }
}