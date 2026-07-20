namespace Construct;

public static class ArtefactUpdaterFactory
{
    private const string AgedSignal = "Aged Signal";
    private const string BackdoorPass = "Backdoor Pass to TAFKAL80ETC Protocol";
    private const string SulfurasCore = "Sulfuras Core Fragment";
    private const string StealthCloak = "Stealth Cloak v2.0";

    //static method to return the correct updater based on the artefact name
    public static IArtefactUpdater For(string artefactName)
        => artefactName switch
        {
            AgedSignal => new AgedSignalUpdater(),
            BackdoorPass => new BackdoorPassUpdater(),
            SulfurasCore => new SulfurasUpdater(),
            StealthCloak => new StealthCloakUpdater(),
            _ => new NormalArtefactUpdater()
        };
}