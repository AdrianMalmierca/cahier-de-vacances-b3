namespace Construct;

public class NormalArtefactUpdater : IArtefactUpdater
{
    public void Update(Artefact artefact)
    {
        Decrease(artefact, 1);
        artefact.TimeToLive--;
        if (artefact.TimeToLive < 0)
            Decrease(artefact, 1);
    }

    //protectted static methods to decrease or increase integrity, ensuring it stays within the bounds of 0 and 50
    protected static void Decrease(Artefact artefact, int amount)
        => artefact.Integrity = Math.Max(0, artefact.Integrity - amount);

    protected static void Increase(Artefact artefact, int amount)
        => artefact.Integrity = Math.Min(50, artefact.Integrity + amount);
}