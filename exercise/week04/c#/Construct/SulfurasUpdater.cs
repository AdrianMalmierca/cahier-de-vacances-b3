namespace Construct;

public class SulfurasUpdater : IArtefactUpdater
{
    public void Update(Artefact artefact)
    {
        //Sulfuras never loses integrity or time to live, so this method does nothing
    }
}