namespace Construct;

public class BackdoorPassUpdater : NormalArtefactUpdater, IArtefactUpdater
{
    void IArtefactUpdater.Update(Artefact artefact)
    {
        Increase(artefact, 1);
        if (artefact.TimeToLive < 11) Increase(artefact, 1);
        if (artefact.TimeToLive < 6) Increase(artefact, 1);

        artefact.TimeToLive--;

        if (artefact.TimeToLive < 0)
            artefact.Integrity = 0;
    }
}