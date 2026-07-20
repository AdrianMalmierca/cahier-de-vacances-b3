package construct;

public class StealthCloakUpdater implements ArtefactUpdater {
    @Override
    public void update(Artefact artefact) {
        artefact.timeToLive--;
        if (artefact.timeToLive % 2 == 0) {
            artefact.integrity = Math.max(0, artefact.integrity - 1);
        }
    }
}