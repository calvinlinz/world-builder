import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class CampSiteManager {
    private Map<String, CampSite> campSite;

    public CampSiteManager() {
        camps = new HashMap<>();
        initializeCampSites();
    }

    private void initializeCampSites() {
        // Add the natural features here with their dimensions and id
        campSite.put("1", new CampSite(19, 1, 2)); // Small tent
        campSite.put("2", new CampSite(20, 2, 2)); // Medium Tent
        campSite.put("3", new CampSite(21, 1, 1)); // Camp Fire
        campSite.put("4", new CampSite(22, 1, 2)); // Camp Accessories
        campSite.put("5", new CampSite(23, 3, 3)); // Large Tent 
    }

    public CampSite getCampSite(String id) {
        return campSite.get(id);
    }

    public CampSite getRandomCampSite(){
        Random random = new Random();
        
        //Generate a random number to pick a random camp item
        int randomNumber = random.nextInt(campSite.size()) + lowerBound;
        
        // Turn random number into a string
        String randomKey = String.valueOf(randomNumber);
    
        return campSite.get(randomKey);

    }


}