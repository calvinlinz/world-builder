package com.API.model;

import java.util.List;
import java.util.ArrayList;
import java.util.Random;


public class CampSiteManager {
    private List<CampSite> camp;

    int minFeatures;
    int maxFeatures;

    public CampSiteManager() {
        minFeatures = 2;
        maxFeatures = 8;
        camp = new ArrayList<>();
        initializeCampSites();
    }

    private void initializeCampSites() {
        // Add the natural features here with their dimensions and id
        camp.add(new CampSite(19, 1, 2)); // Small tent
        camp.add(new CampSite(20, 2, 2)); // Medium Tent
        camp.add(new CampSite(21, 1, 1)); // Camp Fire
        camp.add(new CampSite(22, 1, 2)); // Camp Accessories
        camp.add(new CampSite(23, 3, 3)); // Large Tent 
        camp.add(new CampSite(24, 6, 6)); // Campsite 1
        camp.add(new CampSite(25, 7, 7)); // Campsite 2
        camp.add(new CampSite(26, 4, 6)); // Campsite 3
        camp.add(new CampSite(27, 9, 8)); // Campsite 4
        camp.add(new CampSite(28, 4, 3)); // Campsite 5
        camp.add(new CampSite(29, 3, 3)); // Campsite 6
        camp.add(new CampSite(30, 7, 4)); // Campsite 7
    }

    public CampSite getRandomCampSite() {
        Random random = new Random();
        
        //Generate a random number to pick a random camp item
        int randomNumber = random.nextInt(camp.size());
    
        return camp.get(randomNumber);
    }

    public int getMaxFeatures() {
        return maxFeatures;
    }

    public int getMinFeatures() {
        return minFeatures;
    }
}