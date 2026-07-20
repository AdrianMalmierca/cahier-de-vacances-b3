import { Artefact } from "./artefact";
import { ArtefactUpdater, BaseArtefactUpdater } from "./artefactUpdater";

export class BackdoorPassUpdater extends BaseArtefactUpdater implements ArtefactUpdater {
    update(artefact: Artefact): void {
        this.increase(artefact, 1);
        if (artefact.timeToLive < 11) this.increase(artefact, 1);
        if (artefact.timeToLive < 6) this.increase(artefact, 1);

        artefact.timeToLive--;

        if (artefact.timeToLive < 0) {
            artefact.integrity = 0;
        }
    }
}