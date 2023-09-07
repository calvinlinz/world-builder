package com.API.service;

import java.util.ArrayList;
import java.util.Random;

import com.API.model.Element;
import com.API.model.NaturalFeatureManager;
import com.API.model.Node;
import com.API.model.RoomManager;

public class SectionBuilder {

    private static ArrayList<Node> AllRoomsList = new ArrayList<Node>(); 

    private static ArrayList<Node> roomList1 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList2 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList3 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList4 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList5 = new ArrayList<Node>(); 
    private static ArrayList<Node> roomList6 = new ArrayList<Node>(); 

    public static int[][] getSection(int arrayS, int rooms, int secNumber) {

        RoomManager roomM = new RoomManager();
        NaturalFeatureManager natM = new NaturalFeatureManager();
        Random random = new Random();
        int roomCount = rooms;
        boolean isRoom = false;
        int arraySize = arrayS;
        int count = 0;
        int[][] array = new int[arraySize][arraySize];

        while (count < roomCount) {
            isRoom = false;
            int randomRow = random.nextInt(arraySize);
            int randomCol = random.nextInt(arraySize);

            int duel = random.nextInt(11);
            int id = 0;
            Element currentElement = null;

            if (duel < 7) {
                id = roomM.getRandomRoom().getId();
                currentElement = roomM.getRoom(String.valueOf(id));
                isRoom = true;

            } else {
                id = natM.getRandomFeature().getId();
                currentElement = natM.getNaturalFeature(String.valueOf(id));

            }

            int num = id;
            int topLeftRow = Math.max(randomRow, 0);
            int topLeftCol = Math.max(randomCol, 0);
            int bottomRightRow = randomRow + currentElement.getHeight();
            int bottomRightCol = randomCol + currentElement.getWidth();

            if (checkAval(array, topLeftRow, bottomRightRow, topLeftCol, bottomRightCol)) {

                for (int i = topLeftRow; i < bottomRightRow; i++) {
                    for (int j = topLeftCol; j < bottomRightCol; j++) {
                        array[i][j] = num;
                    }
                }
                if(isRoom){
                    addCorrectPosition(secNumber, topLeftRow, topLeftCol);
                }

                count++;

            }
        }
        //printMap(array);

        return array;
    }

    public static boolean checkAval(int[][] array, int tlr, int brr, int tlc, int brc) {
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

    public static void printMap(int[][] array) {
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

    public static ArrayList<Node> getAllRooms(){


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

    public static void clearRooms(){
        AllRoomsList.clear();
    }

    public static void addCorrectPosition(int secNumber, int topLeftRow, int topLeftCol){
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
