package construct;

public class AgedSignalUpdater extends NormalArtefactUpdater {
    
    @Override
    public void update(Artefact artefact) {
        increase(artefact, 1);
        artefact.timeToLive--;
        if (artefact.timeToLive < 0) {
            increase(artefact, 1);
        }
    }
}