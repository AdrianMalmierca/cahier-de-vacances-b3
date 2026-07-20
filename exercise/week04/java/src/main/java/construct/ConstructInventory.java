/*package construct;

class ConstructInventory {
    Artefact[] artefacts;

    public ConstructInventory(Artefact[] artefacts) {
        this.artefacts = artefacts;
    }

    public void updateSimulation() {
        for (int i = 0; i < artefacts.length; i++) {
            Artefact artefact = artefacts[i];

            if (!artefact.name.equals("Aged Signal")
                    && !artefact.name.equals("Backdoor Pass to TAFKAL80ETC Protocol")) {
                if (artefact.integrity > 0) {
                    if (!artefact.name.equals("Sulfuras Core Fragment")) {
                        artefact.integrity = artefact.integrity - 1;
                    }
                }
            } else {
                if (artefact.integrity < 50) {
                    artefact.integrity = artefact.integrity + 1;

                    if (artefact.name.equals("Backdoor Pass to TAFKAL80ETC Protocol")) {
                        if (artefact.timeToLive < 11) {
                            if (artefact.integrity < 50) {
                                artefact.integrity = artefact.integrity + 1;
                            }
                        }

                        if (artefact.timeToLive < 6) {
                            if (artefact.integrity < 50) {
                                artefact.integrity = artefact.integrity + 1;
                            }
                        }
                    }
                }
            }

            if (!artefact.name.equals("Sulfuras Core Fragment")) {
                artefact.timeToLive = artefact.timeToLive - 1;
            }

            if (artefact.timeToLive < 0) {
                if (!artefact.name.equals("Aged Signal")) {
                    if (!artefact.name.equals("Backdoor Pass to TAFKAL80ETC Protocol")) {
                        if (artefact.integrity > 0) {
                            if (!artefact.name.equals("Sulfuras Core Fragment")) {
                                artefact.integrity = artefact.integrity - 1;
                            }
                        }
                    } else {
                        artefact.integrity = artefact.integrity - artefact.integrity;
                    }
                } else {
                    if (artefact.integrity < 50) {
                        artefact.integrity = artefact.integrity + 1;
                    }
                }
            }
        }
    }
}
*/

package construct;

public class ConstructInventory {
    Artefact[] artefacts;

    public ConstructInventory(Artefact[] artefacts) {
        this.artefacts = artefacts;
    }

    public void updateSimulation() {
        for (Artefact artefact : artefacts) {
            ArtefactUpdaterFactory.forArtefact(artefact.name).update(artefact);
        }
    }
}