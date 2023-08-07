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
        // Add the natural features here with their dimensions and id possibly natrual fatures could be in some id range e.g 20-40 
        naturalFeatures.put("20", new NaturalFeature(20, 1, 1));
        naturalFeatures.put("21", new NaturalFeature(21, 1, 1));
        // Add more pre made natural features as we go...
    }

    public NaturalFeature getNaturalFeature(String id) {
        return naturalFeatures.get(id);
    }

    public NaturalFeature getRandomRoom(){
        Random random = new Random();
        
        //Generate a random number to pick a random room
        int randomNumber = random.nextInt(21) + 20;
        
        // Turn random number into a string
        String randomKey = String.valueOf(randomNumber);
    
        return naturalFeatures.get(randomKey);

    }


}