package com.API.service;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MapExporter {

    /**
     * Contains the map to be exported.
     */
    private MapBuilder mapBuilder;


    /**
     * Creates a MapExporter object.
     * Given a MapBuilder, it can read the 2D array and produce a .csv file.
     * @param map
     */
    public MapExporter(MapBuilder mapBuilder){
        this.mapBuilder = mapBuilder;
    }


    /**
     * Exports the generated map into a .csv file which can then be read by the front-end.
     * Iterates through each element in the map and puts into a file.
     */
    public void exportMap(String filename){
        // Cannot export an empty map.
        if(!mapBuilder.isGenerated()){
            System.err.println("Error: map has not been generated. Please generate a map before exporting it.");
            return;
        }
        filename = checkName(filename);
        System.out.println("MAP WIDTH: " + mapBuilder.getX() + "    MAP HEIGHT: " + mapBuilder.getY());
        int[][] map = mapBuilder.getMap();
        

        // Iterating through the 2D array and reading into a file.
        try (FileWriter writer = new FileWriter(filename)) {

            for (int i = 0; i < map.length; i++) {
                for (int j = 0; j < map[i].length; j++) {
                    int value = map[i][j];
                    writer.write(Integer.toString(value));
                    if(j != map[i].length - 1){
                        writer.write(",");
                    }
                    
                }
                writer.write("\n");
            }

            writer.flush();
            writer.close();

            System.out.println("Map successfully exported into: " + filename + ".");
        } catch (IOException e) {
            System.err.println("Error: map could not be exported.");
            e.printStackTrace();
        }

    }


    /**
     * Helper method to check and correct the filename passed into the program.
     * As this could be a user input (in the future), this is a safe option.
     * @param s
     * @return
     */
    private String checkName(String s){
        if(!s.contains(".csv")){
            return s += ".csv";
        }
        return s;
    }
    
}
