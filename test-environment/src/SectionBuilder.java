import java.util.ArrayList;
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
    }

    public int[][] getSection(int arrayS, int secNumber) {
        double random = Math.random();

        int totalFeatures = 0;
        Random calcFeatures = new Random();

        if (random < 0.5) {
            totalFeatures = calcFeatures.nextInt(rm.getMaxFeatures()-rm.getMinFeatures()) + rm.getMinFeatures();
            return generateVillage(totalFeatures);
        } else if (random < 0.5) {
            totalFeatures = calcFeatures.nextInt(nfm.getMaxFeatures()-nfm.getMinFeatures()) + nfm.getMinFeatures();
            return generateNaturalFeature(totalFeatures);
        } else if (random < 0.75) {
            totalFeatures = calcFeatures.nextInt(csm.getMaxFeatures()-csm.getMinFeatures()) + csm.getMinFeatures();
            return generateCamp(totalFeatures);
        } else {
            totalFeatures = calcFeatures.nextInt(wm.getMaxFeatures()-wm.getMinFeatures()) + wm.getMinFeatures();
            return generateWoodland(totalFeatures);
        }
    }

    /**
     * Generate a campsite surrounded by woodland features
     * @param features the number of features to generate
     * @return the section to be added to the map
     */
    public int[][] generateCamp(int features) {
        return null;
    }

    /**
     * Generate a village surrounded by woodland features
     * @param features the number of features to generate
     * @return the section to be added to the map
     */
    public int[][] generateVillage(int features) {
        return null;
    }

    /**
     * Generate a large natural feature surrounded by woodland features
     * @param features the number of features to generate
     * @return the section to be added to the map
     */
    public int[][] generateNaturalFeature(int features) {
        return null;
    }

    /**
     * Generate a woodland
     * @return the section to be added to the map
     */
    public int[][] generateWoodland(int features) {
        return null;
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
