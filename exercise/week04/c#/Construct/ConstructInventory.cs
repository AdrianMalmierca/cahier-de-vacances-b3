/*namespace Construct;

public class ConstructInventory(Artefact[] artefacts)
{
    public void UpdateSimulation()
    { //simulation of the passing of one day in the construct's inventory
        for (int i = 0; i < artefacts.Length; i++)
        {
            var artefact = artefacts[i];

            if (artefact.Name != "Aged Signal" &&
                artefact.Name != "Backdoor Pass to TAFKAL80ETC Protocol")
            {
                if (artefact.Integrity > 0)
                {
                    if (artefact.Name != "Sulfuras Core Fragment") //objects of this type never lose integrity, nor ttl
                    {
                        artefact.Integrity--;
                    }
                }
            }
            else
            {
                if (artefact.Integrity < 50)
                { //if is Aged Signal or Backdoor Pass to TAFKAL80ETC Protocol, increase integrity
                    artefact.Integrity++;

                    if (artefact.Name == "Backdoor Pass to TAFKAL80ETC Protocol")
                    {
                        if (artefact.TimeToLive < 11 && artefact.Integrity < 50)
                        {
                            artefact.Integrity++;
                        }

                        if (artefact.TimeToLive < 6 && artefact.Integrity < 50)
                        {
                            artefact.Integrity++;
                        }
                    }
                }
            }

            if (artefact.Name != "Sulfuras Core Fragment")
            {
                artefact.TimeToLive--;
            }

            if (artefact.TimeToLive < 0)
            {
                if (artefact.Name != "Aged Signal")
                {
                    if (artefact.Name != "Backdoor Pass to TAFKAL80ETC Protocol")
                    {
                        if (artefact.Integrity > 0)
                        {
                            if (artefact.Name != "Sulfuras Core Fragment")
                            {
                                artefact.Integrity--; //lose 2 if is <0, one already lost in the previous step
                            }
                        }
                    }
                    else //Backdoor lose all integrity if ttl <0
                    {
                        artefact.Integrity = 0;
                    }
                }
                else
                {
                    if (artefact.Integrity < 50)
                    {
                        artefact.Integrity++;
                    }
                }
            }
        }
    }
}*/

namespace Construct;

public class ConstructInventory(Artefact[] artefacts)
{
    public void UpdateSimulation()
    {
        foreach (var artefact in artefacts)
        {
            ArtefactUpdaterFactory.For(artefact.Name).Update(artefact);
        }
    }
}