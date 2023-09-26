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

    public int[][] createForestSquare(int size){
        // Create a forest square that is 20x20 and fill it up with background.
        int[][] forestSquare = new int[size][size];
        for (int i = 0; i < forestSquare.length; i++) {
            for (int j = 0; j < forestSquare[i].length; j++) {
                forestSquare[i][j] = 0;
            }
        }

        // Start creating the forest square.
        int squareSize = 2; // Size of the 2x2 square
        int numSquaresToPlace = 30;

        Set<String> placedPositions = new HashSet<>();

        for (int i = 0; i < numSquaresToPlace; i++) {
            // Generate random row and column indices within bounds
            int randomRow, randomCol;
            String position;
            
            do {
                randomRow = rand.nextInt(forestSquare.length - squareSize + 1);
                randomCol = rand.nextInt(forestSquare[0].length - squareSize + 1);
                position = randomRow + "," + randomCol;
            } while (placedPositions.contains(position));

            // Place the '2' values in the selected 2x2 square
            for (int row = randomRow; row < randomRow + squareSize; row++) {
                for (int col = randomCol; col < randomCol + squareSize; col++) {
                    forestSquare[row][col] = 2;
                }
            }

            // Store the placed position.
            placedPositions.add(position);
            placedPositions = findSurroundingSquares(placedPositions, randomRow, randomCol);

        } 
                        
        return forestSquare;
    }
    


    public int[][] generateForests(){
        System.out.println("\n\nCREATING FOREST SQUARE");
        int[][] forestSquare = createForestSquare(20);
        for (int i = 0; i < forestSquare.length; i++) {
            for (int j = 0; j < forestSquare[i].length; j++) {
                System.out.print(forestSquare[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println("END OF FOREST SQUARE\n\n");
        return this.map;
    }
}
