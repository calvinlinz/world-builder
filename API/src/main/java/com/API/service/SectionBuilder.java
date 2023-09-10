package com.API.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

import java.lang.Math;

/**
 * Generates a section according to a randomly generated double.
 * Four possible sections can be added, either Woodlands, Natural Features
 * (caves, lakes etc),  a Village, or a Campsite
 */
public class SectionBuilder {

    RoomManager rm;
    NaturalFeatureManager nfm;
    CampSiteManager csm;
    WoodlandManager wm;

    private final int maxVillages = 3;
    private final int maxNature = 2;
    private final int maxCamps = 1;
    
    int villagesBuilt;
    int natureBuilt;
    int campsBuilt;

    private static ArrayList<Node> AllRoomsList = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList1 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList2 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList3 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList4 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList5 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList6 = new ArrayList<Node>(); 

    public SectionBuilder() {
        rm = new RoomManager();
        nfm = new NaturalFeatureManager();
        csm = new CampSiteManager();
        wm = new WoodlandManager();
        
        villagesBuilt = 0;
        natureBuilt = 0;
        campsBuilt = 0;
    }

    public int[][] getSection(int arrayS, int secNumber) {
        double random = Math.random();

        int totalFeatures = 0;
        Random calcFeatures = new Random();

        if (random < 0.3) {
        	villagesBuilt++;
        	
        	if (villagesBuilt <= maxVillages) {
	            totalFeatures = calcFeatures.nextInt(rm.getMaxFeatures()-rm.getMinFeatures()) + rm.getMinFeatures();
	            return generateVillage(totalFeatures, secNumber);
        	} else {
        		random += 0.25; // move to next possible section type
        	}
        }
        
        if (random < 0.55) {
        	natureBuilt++;
        	
        	if (natureBuilt <= maxNature) {
        		totalFeatures = calcFeatures.nextInt(nfm.getMaxFeatures()-nfm.getMinFeatures()) + nfm.getMinFeatures();
        		return generateNaturalFeature(totalFeatures, secNumber);
        	} else {
        		random += 0.25; // move to next possible section type
        	}
        }
        
        if (random < 0.80) {
        	campsBuilt++;
        	
        	if (campsBuilt <= maxCamps) {
        		totalFeatures = calcFeatures.nextInt(csm.getMaxFeatures()-csm.getMinFeatures()) + csm.getMinFeatures();
        		return generateCamp(totalFeatures, secNumber);
        	} else {
        		random += 0.25; // move to default section type
        	}
        } 
        
        // Default to woodlands
    	totalFeatures = calcFeatures.nextInt(wm.getMaxFeatures()-wm.getMinFeatures()) + wm.getMinFeatures();
        return generateWoodland(totalFeatures, secNumber);
    }

    /**
     * Generate a campsite surrounded by woodland features
     * @param features the number of features to generate
     * @return the section to be added to the map
     */
    public int[][] generateCamp(int features, int secNumber) {
         int[][] section = new int[27][27];

        int count = 0;
        
        while (count != features) {
            CampSite newCamp = csm.getRandomCampSite();

            int[][] prevSection = copyArray(section);
            section = drawIDs(section, newCamp, false, secNumber);

            if (!compareMaps(section, prevSection)) count++;
        } 
        
        section = addTrees(section, secNumber); // add trees to the segment

        return section;
    }

    /**
     * Generate a village surrounded by woodland features
     * @param features the number of features to generate
     * @return the section to be added to the map
     */
    public int[][] generateVillage(int features, int secNumber) {
        int[][] section = new int[27][27];

        int count = 0;

        while (count != features) {
            Room newRoom = rm.getRandomRoom();

            int[][] prevSection = copyArray(section);
            section = drawIDs(section, newRoom, true, secNumber);

            if (!compareMaps(section, prevSection)) count++;
        } 
        
        section = addTrees(section, secNumber); // add trees to the segment

        return section;
    }

    /**
     * Generate a large natural feature surrounded by woodland features
     * @param features the number of features to generate
     * @return the section to be added to the map
     */
    public int[][] generateNaturalFeature(int features, int secNumber) {
        int[][] section = new int[27][27];

        int count = 0;

        while (count != features) {
            NaturalFeature newFeat = nfm.getRandomFeature();

            int[][] prevSection = copyArray(section);
            section = drawIDs(section, newFeat, false, secNumber);

            if (!compareMaps(section, prevSection)) count++;
        } 
        
        section = addTrees(section, secNumber); // add trees to the segment

        return section;
    }

    /**
     * Generate a woodland
     * @return the section to be added to the map
     */
    public int[][] generateWoodland(int features, int secNumber) {
        int[][] section = new int[27][27];

        int count = 0;

        while (count != features) {
            Woodland newWoodland = wm.getRandomWoodland();

            int[][] prevSection = copyArray(section);
            section = drawIDs(section, newWoodland, false, secNumber);

            if (!compareMaps(section, prevSection)) count++;
        }
        
        return section;
    }
    
    public int[][] addTrees(int[][] section, int secNumber) {
    	Random random = new Random();
    	int numOfTrees = random.nextInt(7)+7; // add between seven to fourteen trees
    	
    	int count = 0;
    	
    	while (count != numOfTrees) {
            Woodland newWoodland = wm.getRandomWoodland();

            int[][] prevSection = copyArray(section);
            section = drawIDs(section, newWoodland, false, secNumber);

            if (!Arrays.equals(prevSection, section)) count++;
        }
    	
    	return section;
    }

    public int[][] drawIDs(int[][] currentArray, Element currentElement, boolean isRoom, int secNumber) {
        int[][] newArray = copyArray(currentArray);

        Random random = new Random();

        int id = currentElement.getId();

        int randomRow = random.nextInt(27);
        int randomCol = random.nextInt(27);
        int topLeftRow = Math.max(randomRow, 0);
        int topLeftCol = Math.max(randomCol, 0);
        int bottomRightRow = randomRow + currentElement.getHeight();
        int bottomRightCol = randomCol + currentElement.getWidth();

        if (checkAval(newArray, topLeftRow, bottomRightRow, topLeftCol, bottomRightCol)) {

            for (int i = topLeftRow; i < bottomRightRow; i++) {
                for (int j = topLeftCol; j < bottomRightCol; j++) {
                    newArray[i][j] = id;
                }
            }

            if(isRoom){
                addCorrectPosition(secNumber, topLeftRow, topLeftCol);
            }
        }
        return newArray;
    }

    public boolean checkAval(int[][] array, int tlr, int brr, int tlc, int brc) {
        if(brc>=array.length || brr>=array.length || tlr == 0 || tlc == 0){
            return false;
        }

        // by adding one to all postions we make it look as though the room has a one block border around it,
        // this is ensureing rooms dont get placed directly next to each other
        brr = brr+1; 
        brc = brc+1;
        tlr = tlr -1;
        tlc = tlc -1;

        for (int i = tlr; i < brr; i++) {
            for (int j = tlc; j < brc; j++) {

                if (array[i][j] != 0) {

                    return false;
                }
            }
        }
        return true;
    }

    private boolean compareMaps(int[][] one, int[][] two) {
    	for (int i=0; i<27; i++) {
    		for (int j=0; j<27; j++) {
    			if (one[i][j] != two[i][j]) {
    				return false;
    			}
    		}
    	}
    	return true;
    }

    public void printMap(int[][] array) {
        String red = "\u001B[31m";
        String green = "\u001B[32m";
        String resetColor = "\u001B[0m";
        String blue = "\u001B[34m";
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                if (array[i][j] >= 20 && array[i][j] < 40) {
                    System.out.print(green + array[i][j] + "" + resetColor);
                } else if (array[i][j] != 0 && array[i][j] < 20) {
                    System.out.print(red + array[i][j] + " " + resetColor);
                } 
                else if(array[i][j] == 40){
                    System.out.print(blue + "#" + " " + resetColor);
                }
                else {
                    System.out.print(array[i][j] + " ");
                }

            }
            System.out.println();
        }
    }
    
    public void printPlainMap(int[][] array) {
    	for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
            	System.out.print(array[i][j] + " ");
            }
            System.out.println();
        }
    	System.out.println();
    }

    public ArrayList<Node> getAllRooms(){
        // here we are creating a order for the path to take so it zig zags 
        // through the sections as oppose to a boring path straight up and down the map
        AllRoomsList.addAll(roomList1);
        AllRoomsList.addAll(roomList4);
        AllRoomsList.addAll(roomList5);
        AllRoomsList.addAll(roomList2);
        AllRoomsList.addAll(roomList3);
        AllRoomsList.addAll(roomList6);

        return AllRoomsList;
    }
    
    private int[][] copyArray(int[][] array) {
    	int[][] returnArray = new int[27][27];
    	
    	for(int i=0; i<27; i++) {
    		for(int j=0; j<27; j++) {
    			returnArray[i][j] = array[i][j];
    		}
    	}
    	
    	return returnArray;
    }

    public void clearRooms(){
        AllRoomsList.clear();
    }

    public void addCorrectPosition(int secNumber, int topLeftRow, int topLeftCol){
        switch (secNumber) {
                   case 1:
                       roomList1.add(new Node(topLeftRow+1, topLeftCol-1));
                       break;
                   case 2:
                       roomList2.add(new Node(topLeftRow+1 + 27, topLeftCol-1) );
                       break;
                   case 3:
                      roomList3.add(new Node(topLeftRow+1 +54, topLeftCol-1 ) );
                       break;
                   case 4:
                       roomList4.add(new Node(topLeftRow+1, topLeftCol-1 + 27) );
                       break;
                   case 5:
                       roomList5.add(new Node(topLeftRow+1+ 27, topLeftCol-1 +27) );
                       break;
                   case 6:
                       roomList6.add(new Node(topLeftRow+1+ 54, topLeftCol-1 +27) );
                       break;
        }    
    }
}