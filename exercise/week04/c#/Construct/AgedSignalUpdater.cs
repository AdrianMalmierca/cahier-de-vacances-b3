namespace Construct;

public class AgedSignalUpdater : NormalArtefactUpdater, IArtefactUpdater
{
    void IArtefactUpdater.Update(Artefact artefact)
    {
        Increase(artefact, 1);
        artefact.TimeToLive--;
        if (artefact.TimeToLive < 0)
            Increase(artefact, 1);
    }
}