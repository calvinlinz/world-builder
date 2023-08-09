package com.API.service;

public class QaudrantBuilder {


    public static int [][] getQaundrant(){

        return new int[2][2];


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
