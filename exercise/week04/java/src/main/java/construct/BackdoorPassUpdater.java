package construct;

public class BackdoorPassUpdater extends NormalArtefactUpdater {
    
    @Override
    public void update(Artefact artefact) {
        increase(artefact, 1);
        if (artefact.timeToLive < 11) increase(artefact, 1);
        if (artefact.timeToLive < 6) increase(artefact, 1);

        artefact.timeToLive--;

        if (artefact.timeToLive < 0) {
            artefact.integrity = 0;
        }
    }
}