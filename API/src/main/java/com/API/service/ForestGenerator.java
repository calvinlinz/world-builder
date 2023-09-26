package com.API.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

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
    private ArrayList<Integer> invalidCodes = new ArrayList<>(List.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23));

    private int backgroundCode = 0;
    private int bushCode = 1;
    private int treeCode = 2; 
    
    

    /**
     * 
     * @param mapBuilder
     */
    public ForestGenerator(MapBuilder mapBuilder){
        this.mapBuilder = mapBuilder;
        this.map = this.mapBuilder.getMap();
    }

    private Set<String> findSurroundingSquares(Set<String> placedPositions, int row, int col){
        placedPositions.add((row - 1) + "," + (col - 1));
        placedPositions.add((row - 1) + "," + (col));
        placedPositions.add((row - 1) + "," + (col + 1));
        placedPositions.add(row + "," + (col - 1));
        placedPositions.add(row + "," + (col + 1));
        placedPositions.add((row + 1) + "," + (col - 1));
        placedPositions.add((row + 1) + "," + (col));
        placedPositions.add((row + 1) + "," + (col + 1));
        return placedPositions;
    }

    public int[][] addBushes(int[][] forestSquare, int chance){
        for(int i = 0; i < forestSquare.length; i++){
            for(int j = 0; j < forestSquare[0].length; j++){
                if(forestSquare[i][j] != backgroundCode) continue;
                // There is a 1/chance probability of a bush appearing.
                // e.g. pick a number 0 to chance.
                int probability = rand.nextInt(chance + 1);
                if(probability == 2){
                    forestSquare[i][j] = bushCode;
                }
            }
        }
        return forestSquare;
    }


    public int[][] createForestSquare(int size, int numTrees){

        // Create a blank forest square that is 20x20 and fill it up with background.
        int[][] forestSquare = new int[size][size];
        for (int i = 0; i < forestSquare.length; i++) {
            for (int j = 0; j < forestSquare[i].length; j++) { forestSquare[i][j] = backgroundCode; }
        }

        // Start creating the forest square.
        int squareSize = 2;
        Set<String> placedPositions = new HashSet<>();

        for (int i = 0; i < numTrees; i++) {

            int randomRow, randomCol;
            String position;
            do {
                randomRow = rand.nextInt(forestSquare.length - squareSize + 1);
                randomCol = rand.nextInt(forestSquare[0].length - squareSize + 1);
                position = randomRow + "," + randomCol;
            } while (placedPositions.contains(position));

            // Place the trees in the selected 2x2 square
            for (int row = randomRow; row < randomRow + squareSize; row++) {
                for (int col = randomCol; col < randomCol + squareSize; col++) {
                    forestSquare[row][col] = treeCode;
                }
            }

            // Store the placed position and surrounding so there cannot be overlaps.
            placedPositions.add(position);
            placedPositions = findSurroundingSquares(placedPositions, randomRow, randomCol);
        }              
        return forestSquare;
    }
    


    public int[][] generateForests(){
        // Create the forest square
        System.out.println("\n\nCREATING FOREST SQUARE");
        int[][] forestSquare = createForestSquare(20, 20);
        for (int i = 0; i < forestSquare.length; i++) {
            for (int j = 0; j < forestSquare[i].length; j++) {
                System.out.print(forestSquare[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println("END OF FOREST SQUARE\n\n");


        // Add bushes and more into the forest square
        System.out.println("\n\nPUTTING BUSHES INSIDE FOREST SQUARE");
        int[][] finalForestSquare = addBushes(forestSquare, 15);
        for (int i = 0; i < finalForestSquare.length; i++) {
            for (int j = 0; j < finalForestSquare[i].length; j++) {
                System.out.print(finalForestSquare[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println("\n\nDONE PUTTING BUSHES INSIDE FOREST SQUARE");

        return this.map;
    }
}
