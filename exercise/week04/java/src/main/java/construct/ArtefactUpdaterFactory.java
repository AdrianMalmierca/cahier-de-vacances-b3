package construct;

public class ArtefactUpdaterFactory {
    private static final String AGED_SIGNAL = "Aged Signal";
    private static final String BACKDOOR_PASS = "Backdoor Pass to TAFKAL80ETC Protocol";
    private static final String SULFURAS_CORE = "Sulfuras Core Fragment";
    private static final String STEALTH_CLOAK = "Stealth Cloak v2.0";

    private ArtefactUpdaterFactory() {
    }

    public static ArtefactUpdater forArtefact(String name) {
        return switch (name) {
            case AGED_SIGNAL -> new AgedSignalUpdater();
            case BACKDOOR_PASS -> new BackdoorPassUpdater();
            case SULFURAS_CORE -> new SulfurasUpdater();
            case STEALTH_CLOAK -> new StealthCloakUpdater();
            default -> new NormalArtefactUpdater();
        };
    }
}