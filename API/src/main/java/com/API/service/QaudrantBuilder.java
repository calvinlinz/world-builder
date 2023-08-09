package com.API.service;

import java.util.Random;

import com.API.model.Element;
import com.API.model.NaturalFeatureManager;
import com.API.model.RoomManager;

public class QaudrantBuilder {


    public static int [][] getQaudrant(int arrayS, int rooms){

         // Assuming you have a 20x20 array filled with 0s and a 1 at one position
        
        RoomManager roomM = new RoomManager();
        NaturalFeatureManager natM = new NaturalFeatureManager();
        Random random = new Random();
        int roomCount = rooms;
        int arraySize = arrayS;
        int count =0;
        int[][] array = new int[arraySize][arraySize];

        while(count < roomCount){
        int randomRow = random.nextInt(arraySize);
        int randomCol = random.nextInt(arraySize);

        int duel = random.nextInt(11);
        int id =0;
        Element currentElement = null;

        if(duel < 7 ){
            id =  roomM.getRandomRoom().getId();
            currentElement = roomM.getRoom(String.valueOf(id));

        }
        else {
            id =  natM.getRandomFeature().getId();
            currentElement = natM.getNaturalFeature(String.valueOf(id));

        }

       
        int num = id;
        int topLeftRow = Math.max(randomRow, 0);
        int topLeftCol = Math.max(randomCol, 0);
        int bottomRightRow = randomRow + currentElement.getHeight();
        int bottomRightCol = randomCol + currentElement.getWidth();

        if(checkAval(array,topLeftRow,bottomRightRow,topLeftCol,bottomRightCol)){

        for (int i = topLeftRow; i < bottomRightRow; i++) {
            for (int j = topLeftCol; j < bottomRightCol; j++) {
                array[i][j] = num;
            }
        }

        count++;
      
        }    
        }
        printMap(array);

        return array;
    }

    public static boolean checkAval(int[][] array, int tlr, int brr,int tlc, int brc){
        if(brc>array.length || brr>array.length){
            return false;
        }
        brr = (brr != array.length) ? brr + 1 : brr;
        brc = (brc != array.length) ? brc + 1 : brc;
        tlr = (tlr != 0) ? tlr - 1 : tlr;
        tlc = (tlc != 0) ? tlc - 1 : tlc;   
       
        for (int i = tlr; i < brr; i++) {
            for (int j = tlc; j < brc; j++) {

                if(array[i][j] != 0){
                    
                    return false;
                }
            }
        }
        return true;
    }

    public static void printMap(int [][] array){
        // Print the resulting array to see the 4x4 square
        String red = "\u001B[31m";
        String green ="\u001B[32m";
        String resetColor = "\u001B[0m";
       for (int i = 0; i < array.length; i++) {
           for (int j = 0; j < array[i].length; j++) {
               if(array[i][j] >=20 ){
               System.out.print(green + array[i][j] + " " + resetColor);
               }
               else if(array[i][j] != 0){
                   System.out.print(red + array[i][j] + " " + resetColor);
               }
               else{
                   System.out.print(array[i][j] + " ");
               }

           }
           System.out.println();
       }

   }











    
}
