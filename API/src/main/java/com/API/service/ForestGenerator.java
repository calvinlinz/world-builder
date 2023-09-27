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

    /**
     * Random object used to generate random numbers/
     */
    private Random rand = new Random();

    /**
     * List of invalid codes which a forest cannot overlap.
     */
    private ArrayList<Integer> invalidCodes = new ArrayList<>(List.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23));

    /**
     * Code for background tile in map.
     */
    private int backgroundCode = 0;

    /**
     * Code for bush tile in map.
     */
    private int bushCode = 1;

    /**
     * Code for tree tile in map. Tree is a 2x2 object.
     */
    private int treeCode = 2; 
    
    
    /**
     * Creates a ForestGenerator object which observes base map and places forests in empty space.
     * @param mapBuilder MapBuilder object which has map containing houses/paths/trees, etc.
     */
    public ForestGenerator(MapBuilder mapBuilder){
        this.mapBuilder = mapBuilder;
        this.map = this.mapBuilder.getMap();
    }


    /**
     * Finds the surrounding squares of a given coordinate and ensures no trees can be placed next to it.
     * This helps prevent overlapping trees when generating forests.
     * @param placedPositions Set containing all tiles a tree cannot be placed.
     * @param row Row position of the current tile.
     * @param col Col position of the current tile.
     * @return The new set with the surrounding squares added inside it.
     */
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


    /**
     * Adds bushes into a forest square.
     * @param forestSquare The 2D array forest already made.
     * @param chance The probability that a bush will appear in a tile.
     * @return The new 2D array with bushes inside it.
     */
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


    /**
     * Creates a big 2D array "tile" which is a forest. Can be placed inside the bigger map.
     * Creates trees randomly and places inside, ensuring no overlaps using a placedPositions set.
     * @param size The size of the 2D array, e.g. size of 20 will make a 20x20 forest.
     * @param numTrees The number of trees inside a given forest.
     * @return A forest square 2D array which can be placed inside bigger map.
     */
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
    

    /**
     * Generates forest and returns the final big map, which can then be manipulated further or displayed on site.
     * @return
     */
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
