import java.util.List;
import java.util.ArrayList;
import java.util.Random;

public class NaturalFeatureManager {
    private List<NaturalFeature> naturalFeatures;

    boolean[] caveAvailability;

    int minFeatures;
    int maxFeatures;

    public NaturalFeatureManager() {
        minFeatures = 1;
        maxFeatures = 3;
        naturalFeatures = new ArrayList<>();
        initializeNaturalFeatures();

        caveAvailability = new boolean[4];
    }

    private void initializeNaturalFeatures() {
        // Add the natural features here with their dimensions and id
        naturalFeatures.add(new NaturalFeature(15, 3, 3)); // small cave 
        naturalFeatures.add(new NaturalFeature(16, 4, 4)); // medium cave
        naturalFeatures.add(new NaturalFeature(17, 5, 5)); // large cave
        naturalFeatures.add(new NaturalFeature(18, 6, 6)); // Massive Cave
    }

    public NaturalFeature getNaturalFeature(int id) {
        return naturalFeatures.get(id);
    }

    public NaturalFeature getRandomFeature() {

        boolean validNum = false;
        int index = 0;

        do {
            Random random = new Random();
            
            // Generate random number to act as an index for the list
            int randomNumber = random.nextInt(naturalFeatures.size());
            index = randomNumber;

            if (randomNumber>3) {
                // check if the cave has been used
                validNum = checkCaveAvailability(randomNumber);
            } else {
                // not a cave, break
                break;
            }
        } while (!validNum);
    
        return naturalFeatures.get(index);
    }

    public boolean checkCaveAvailability(int randomNumber) {
        int index = randomNumber-4;

        if (caveAvailability[index]) {
            return false;
        } else {
            caveAvailability[index] = true;
            return true;
        }
    }

    public int getMaxFeatures() {
        return maxFeatures;
    }

    public int getMinFeatures() {
        return minFeatures;
    }
}