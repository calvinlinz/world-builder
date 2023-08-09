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
    private void createMap() {

        int currentRow = 0;
        int currentColumn = 0;

        // Create two rows
        for (int i=0; i<2; i++) {

            // Create three columns
            for (int j=0; j<3; j++) {
                
                currentColumn += 27;
            }

            currentRow += 27;
        }
    }

    /**
     * Returns the current map.
     */
    private int[][] getMap() {
        return this.currentMap;
    }
}
