import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class WoodlandManager {
    private List<Woodland> woodlands;

    int minFeatures;
    int maxFeatures;

    public WoodlandManager() {
        minFeatures = 30;
        maxFeatures = 50;
        woodlands = new ArrayList<>();
        initializeWoodlands();
    }

    private void initializeWoodlands() {
        // Add the natural features here with their dimensions and id
        woodlands.add(new Woodland(1, 1, 1)); // bush
        woodlands.add(new Woodland(2, 2, 2)); // tree
        woodlands.add(new Woodland(3, 1, 1)); // small rock
        woodlands.add(new Woodland(4, 2, 1)); // rock cluster
    }

    public Woodland getRandomWoodland(){
        Random random = new Random();
        
        //Generate a random number to pick a random camp item
        int randomNumber = random.nextInt(woodlands.size());
    
        return woodlands.get(randomNumber);
    }

    public int getMaxFeatures() {
        return maxFeatures;
    }

    public int getMinFeatures() {
        return minFeatures;
    }
}