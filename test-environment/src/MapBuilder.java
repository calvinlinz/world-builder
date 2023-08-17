public class MapBuilder {

    private int[][] map;
    private final int x, y;
    private boolean mapGenerated;

    /**
     * Generates a full-sized array map.
     * 
     * This is done by creating a 3 by 2 map of pre-generated sections.
     */
    public MapBuilder(int x, int y) {
        this.x = x;
        this.y = y;        
        // 81 and 54, the initial values passed in as arguments, represent a 3 x 2 formation of 27 by 27 blocks.
        this.map = new int[x][y];
        this.mapGenerated = false;
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
                int[][] newSection = SectionBuilder.getQuadrant(27, 10);

                // Copy the array over
                copyArray(newSection, currentRow, currentColumn);

                // Index the current column
                currentColumn += 27;
            }

            currentColumn = 0;
            currentRow += 27;
        }

        SectionBuilder.printMap(map);
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

