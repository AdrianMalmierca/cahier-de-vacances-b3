package construct;

public class NormalArtefactUpdater implements ArtefactUpdater {
    
    @Override
    public void update(Artefact artefact) {
        decrease(artefact, 1);
        artefact.timeToLive--;
        if (artefact.timeToLive < 0) {
            decrease(artefact, 1);
        }
    }

    protected static void decrease(Artefact artefact, int amount) {
        artefact.integrity = Math.max(0, artefact.integrity - amount);
    }

    protected static void increase(Artefact artefact, int amount) {
        artefact.integrity = Math.min(50, artefact.integrity + amount);
    }
}