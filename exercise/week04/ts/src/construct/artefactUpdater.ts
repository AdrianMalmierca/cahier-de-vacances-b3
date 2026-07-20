import { Artefact } from "./artefact";

export interface ArtefactUpdater {
    update(artefact: Artefact): void;
}

export abstract class BaseArtefactUpdater {
    protected decrease(artefact: Artefact, amount: number): void {
        artefact.integrity = Math.max(0, artefact.integrity - amount);
    }

    protected increase(artefact: Artefact, amount: number): void {
        artefact.integrity = Math.min(50, artefact.integrity + amount);
    }
}