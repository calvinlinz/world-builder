public class MapBuilder {

    private int[][] map;
    private final int x, y;
    private boolean mapGenerated;
    private SectionBuilder sb;

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
        sb = new SectionBuilder();
    }

    /**
     * Creates a new map, and saves over top of the existing map.
     * 
     * Uses six tiles fetched from the Quadrant Builder function.
     */
    public void createMap() {

        int currentRow = 0;
        int currentColumn = 0;
        int secNumber = 0;

        // Create two rows
        for (int i=0; i<2; i++) {

            // Create three columns
            for (int j=0; j<3; j++) {
                secNumber++;

                // Generate a new section
                int[][] newSection = sb.getSection(27, secNumber);

                // Copy the array over
                copyArray(newSection, currentRow, currentColumn);

                // Index the current column
                currentRow += 27;
            }

            currentColumn += 27;
            currentRow = 0;
        }

        AStarPathFinding.makePaths(map, sb.getAllRooms());

        sb.printMap(map);
        mapGenerated = true;
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
        return this.map;
    }

    public int getX(){
        return this.x;
    }

    public int getY(){
        return this.y;
    }

    /**
     * Is used to determine if the MapBuilder has already made a map.
     * @return A boolean representing if a map has been generated.
     */
    public boolean isGenerated(){
        return mapGenerated;
    }
}

