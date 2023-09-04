package com.API.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class NaturalFeatureManager {
    private Map<String, NaturalFeature> naturalFeatures;

    public NaturalFeatureManager() {
        naturalFeatures = new HashMap<>();
        initializeNaturalFeatures();
    }

    private void initializeNaturalFeatures() {
        // Add the natural features here with their dimensions and id
        naturalFeatures.put("1", new NaturalFeature(1, 1, 1)); // bush
        naturalFeatures.put("2", new NaturalFeature(2, 2, 2)); // tree
        naturalFeatures.put("3", new NaturalFeature(3, 1, 1)); // small rock
        naturalFeatures.put("4", new NaturalFeature(4, 2, 1)); // rock cluster
        naturalFeatures.put("15", new NaturalFeature(15, 0, 0)); // small cave 
        naturalFeatures.put("16", new NaturalFeature(16, 0, 0)); // medium cave
        naturalFeatures.put("17", new NaturalFeature(17, 0, 0)); // large cave
        naturalFeatures.put("18", new NaturalFeature(18, 0, 0)); // Massive Cave
    }

    public NaturalFeature getNaturalFeature(String id) {
        return naturalFeatures.get(id);
    }

    public NaturalFeature getRandomFeature(){
        Random random = new Random();
        
        //Generate a random number to pick a random room
        int randomNumber = random.nextInt(naturalFeatures.size()) + lowerBound;
        
        // Turn random number into a string
        String randomKey = String.valueOf(randomNumber);
    
        return naturalFeatures.get(randomKey);

    }


}