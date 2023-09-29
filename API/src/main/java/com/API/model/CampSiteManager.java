package com.API.model;

import java.util.List;
import java.util.ArrayList;
import java.util.Random;


public class CampSiteManager {
    private List<CampSite> camp;

    int minFeatures;
    int maxFeatures;

    public CampSiteManager() {
        minFeatures = 6;
        maxFeatures = 12;
        camp = new ArrayList<>();
        initializeCampSites();
    }

    private void initializeCampSites() {
        // Add the natural features here with their dimensions and id
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