import java.util.ArrayList;
import java.util.Random;
import java.lang.Math;

public class SectionBuilder {

    RoomManager rm;
    NaturalFeatureManager nfm;

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
    }

    public int[][] getSection(int arrayS, int secNumber) {
        double random = Math.random();

        if (random < 0.5) {
            return generateVillage();
        } else if (random < 0.5) {
            return generateNaturalFeature();
        } else if (random < 0.75) {
            return generateCamp();
        } else {
            return generateWoodland();
        }
    }

    public int[][] generateCamp() {
        return null;
    }

    public int[][] generateVillage() {
        return null;
    }

    public int[][] generateNaturalFeature() {
        return null;
    }

    public int[][] generateWoodland() {
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
