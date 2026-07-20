namespace Construct;

public class StealthCloakUpdater : IArtefactUpdater
{
    public void Update(Artefact artefact)
    {
        artefact.TimeToLive--;
        if (artefact.TimeToLive % 2 == 0) //lose integrity every 2 days
            artefact.Integrity = Math.Max(0, artefact.Integrity - 1);
    }
}