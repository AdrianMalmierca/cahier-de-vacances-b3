import { ArtefactUpdater } from "./artefactUpdater";
import { NormalArtefactUpdater } from "./normalArtefactUpdater";
import { AgedSignalUpdater } from "./agedSignalUpdater";
import { BackdoorPassUpdater } from "./backdoorPassUpdater";
import { SulfurasUpdater } from "./sulfurasUpdater";
import { StealthCloakUpdater } from "./stealthCloakUpdater";

const AGED_SIGNAL = "Aged Signal";
const BACKDOOR_PASS = "Backdoor Pass to TAFKAL80ETC Protocol";
const SULFURAS_CORE = "Sulfuras Core Fragment";
const STEALTH_CLOAK = "Stealth Cloak v2.0";

export function updaterFor(name: string): ArtefactUpdater {
    switch (name) {
        case AGED_SIGNAL: return new AgedSignalUpdater();
        case BACKDOOR_PASS: return new BackdoorPassUpdater();
        case SULFURAS_CORE: return new SulfurasUpdater();
        case STEALTH_CLOAK: return new StealthCloakUpdater();
        default: return new NormalArtefactUpdater();
    }
}