package com.API.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ForestGenerator {

    /**
     * Contains the map to be exported.
     */
    private MapBuilder mapBuilder;

    /**
     * The map data extracted from the mapBuilder.
     */
    private int[][] map;

    private Random rand = new Random();

    private int radius = 10;
    private int currForests = 0;
    private int numForests = 2;
    private int minimumTrees = 8;
    private int treeCode = 2; // Tree is a 2x2 object
    private ArrayList<Integer> invalidCodes = new ArrayList<>(List.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23));


    /**
     * 
     * @param mapBuilder
     */
    public ForestGenerator(MapBuilder mapBuilder){
        this.mapBuilder = mapBuilder;
        this.map = this.mapBuilder.getMap();
    }

    public int[][] createForestSquare(int size){
        // Create a forest square that is 20x20 and fill it up with background.
        int[][] forestSquare = new int[size][size];
        for (int i = 0; i < forestSquare.length; i++) {
            for (int j = 0; j < forestSquare[i].length; j++) {
                forestSquare[i][j] = 0;
            }
        }

        // Iterate through the forest square and start making 2x2 trees inside it.
        // If we fail to place a tree five times, then we give up and our forest is complete.
        int failure = 0;
        while(failure < 5){
            // Pick a random spot in the 
            int randomX = rand.nextInt(forestSquare[0].length);
            int randomY = rand.nextInt(forestSquare.length);
        }
                        
                


        

        return forestSquare;
    }
    

    /**
     * Iterate through the entire map once, and place a forest where possible.
     */
    public void generateAForest(){
        int currTrees = 0;
        int rows = this.map.length;
        int cols = this.map[0].length;




        currForests++;
    }

    public int[][] generateForests(){
        int[][] forestSquare = createForestSquare(20);
        for (int i = 0; i < forestSquare.length; i++) {
            for (int j = 0; j < forestSquare[i].length; j++) {
                System.out.print(forestSquare[i][j] + " ");
            }
            // Print a new line after each row
            System.out.println();
        }

        return this.map;
    }
}
