package com.API.service;

public class MapBuilder {

    int[][] map;

    /**
     * Generates a full-sized array map.
     * 
     * This is done by creating a 3 by 2 map of pre-generated sections.
     */
    public MapBuilder() {
        
        // 81 and 54 represents a 3 x 2 formation of 27 by 27 blocks.
        this.map = new int[81][54];
    }

    /**
     * Creates a new map, and saves over top of the existing map.
     * 
     * Uses six tiles fetched from the Quadrant Builder function.
     */
    public void createMap() {

        int currentRow = 0;
        int currentColumn = 0;

        // Create two rows
        for (int i=0; i<2; i++) {

            // Create three columns
            for (int j=0; j<3; j++) {

                // Generate a new section
                int[][] newSection = QuadrantBuilder.getQuadrant(27, 10);

                // Copy the array over
                copyArray(newSection, currentRow, currentColumn);

                // Index the current column
                currentColumn += 27;
            }

            currentColumn = 0;
            currentRow += 27;
        }

        QuadrantBuilder.printMap(map);
    }

    private void copyArray(int[][] section, int currentRow, int currentColumn) {
        // Copy the section into the master array
        for (int i=currentColumn; i<currentColumn+27; i++) {
            for (int j=currentRow; j<currentRow+27; j++) {
                map[i][j] = section[(i%27)][(j%27)];
            }
        }
    }

    /**
     * Returns the current map.
     */
    public int[][] getMap() {
        return this.currentMap;
    }
}

