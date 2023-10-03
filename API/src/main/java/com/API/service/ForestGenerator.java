package com.API.service;

import java.sql.Array;
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
     * Size of the map, passed in from the front-end.
     */
    private int size;

    /**
     * Random object used to generate random numbers/
     */
    private Random rand = new Random();

    /**
     * List of invalid codes which a forest cannot overlap.
     */
    private ArrayList<Integer> invalidCodes = new ArrayList<>(List.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23));

    /**
     * List of invalid tent codes. Some overlap but didn't change.
     */
    private ArrayList<Integer> tentCodes = new ArrayList<>(List.of(19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30));

    /**
     * Code for path tile in map.
     */
    private int pathCode = 40;

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
    public ForestGenerator(MapBuilder mapBuilder, int size){
        this.mapBuilder = mapBuilder;
        this.map = this.mapBuilder.getMap();
        this.size = size;
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
        // Immediate surrounding positions.
        placedPositions.add((row - 1) + "," + (col - 1));
        placedPositions.add((row - 1) + "," + (col));
        placedPositions.add((row - 1) + "," + (col + 1));
        placedPositions.add(row + "," + (col - 1));
        placedPositions.add(row + "," + (col + 1));
        placedPositions.add((row + 1) + "," + (col - 1));
        placedPositions.add((row + 1) + "," + (col));
        placedPositions.add((row + 1) + "," + (col + 1));

        // So we do not create yucky lines of trees, more random!
        int randomNumber = rand.nextInt(2);
        if(randomNumber == 1){
            placedPositions.add((row - 2) + "," + col);
            placedPositions.add((row + 2) + "," + col);
            placedPositions.add(row + "," + (col - 2));
            placedPositions.add(row + "," + (col + 2));
        }

        return placedPositions;
    }


    /**
     * Adds bushes into a forest square.
     * @param forestSquare The 2D array forest already made.
     * @param chance The probability that a bush will appear in a tile.
     * @return The new 2D array with bushes inside it.
     */
    private int[][] addBushes(int[][] forestSquare, int chance){
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
    private int[][] createForestSquare(int size, int numTrees){

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

            placedPositions.add(position);
            placedPositions = findSurroundingSquares(placedPositions, randomRow, randomCol);
            // Store the placed position and surrounding so there cannot be overlaps.
        }              
        return forestSquare;
    }


    /**
     * Checks if the position is a valid place to put a forest.
     * @param forestSquare The forest square we want to place.
     * @param row The current row tile.
     * @param col The current col tile.
     * @param map The bigger map we want to place the forest square in.
     * @return A boolean indicating if it is a valid position.
     */
    private boolean isPositionValid(int[][] forestSquare, int row, int col, int[][] map) {
        // Check if the position is within bounds
        if (row < 0 || col < 0 || row + forestSquare.length > map.length || col + forestSquare[0].length > map[0].length) { return false; }
        
        // Check if any position within the square contains an invalid code.
        // If so, we cannot place it there.
        for (int i = row; i < row + forestSquare.length; i++) {
            for (int j = col; j < col + forestSquare[0].length; j++) {
                if (invalidCodes.contains(map[i][j]) || tentCodes.contains(map[i][j]) || map[i][j] == pathCode) { return false; }
            }
        }
        return true;
    }


    /**
     * Find a valid place to place the forest inside the bigger map.
     * @param forestSquare The forest square to place.
     */
    public void placeForestSquare(int[][] forestSquare) {
        Random random = new Random();

        int forestWidth = forestSquare.length;
        int forestHeight = forestSquare[0].length;
        int mapWidth = this.map.length;
        int mapHeight = this.map[0].length;

        int attempt = 0;
        while (attempt < 200) {
            int randomRow = random.nextInt(mapWidth - forestWidth + 1);
            int randomCol = random.nextInt(mapHeight - forestHeight + 1);

            if (isPositionValid(forestSquare, randomRow, randomCol, this.map)) {
                // Place the forestSquare in this.map
                for (int i = 0; i < forestWidth; i++) {
                    for (int j = 0; j < forestHeight; j++) {
                        this.map[randomRow + i][randomCol + j] = forestSquare[i][j];
                    }
                }
                System.out.println("Number of attempts: " + attempt);
                break; // Exit the loop once the forestSquare is placed
            }
            attempt++;
        }
    }
    

    /**
     * Generates forest and returns the final big map, which can then be manipulated further or displayed on site.
     * @return
     */
    public int[][] generateForests(){

        int numForest = 1;
        if(this.size > 45) numForest = 3;
        else if(this.size > 30) numForest = 2;
        
        
        for(int i = 0; i < numForest; i++){
            // Create the forest square, with a given size and number of trees.
            int[][] forestSquare = createForestSquare(20, 30);

            // Add bushes and more into the forest square, with a given chance.
            int[][] finalForestSquare = addBushes(forestSquare, 15);

            // Place the forest square into the final map.
            placeForestSquare(finalForestSquare);
        }
        this.map = addExtraTrees(this.map);
        return this.map;
    }


    /**
     * Extra method at the request of the graphics team.
     * Adds extra trees everywhere on the final map!
     * @return
     */
    private int[][] addExtraTrees(int[][] originalMap){
        for(int i = 0; i < originalMap.length; i++){
            for(int j = 0; j < originalMap[0].length; j++){
                if(i == 0 || j == 0 || i == originalMap.length - 1 || j == originalMap[0].length - 1) continue; // Do not place trees on the edge
                if(originalMap[i][j] == backgroundCode){
                    int randNum = rand.nextInt(42);
                    if(randNum == 2){
                        // Check if we can place the tree. If so then do it!
                        if(originalMap[i][j+1] == backgroundCode && originalMap[i+1][j] == backgroundCode && originalMap[i+1][j+1] == backgroundCode){
                            originalMap[i][j] = treeCode;
                            originalMap[i][j+1] = treeCode;
                            originalMap[i+1][j] = treeCode;
                            originalMap[i+1][j+1] = treeCode;
                        }
                    } else{
                        // Do another lottery for the bushes.
                        randNum = rand.nextInt(45);
                        if(randNum == 4){
                            originalMap[i][j] = bushCode;
                        }
                    }
                }
            }
        }
        return originalMap;
    }
}
