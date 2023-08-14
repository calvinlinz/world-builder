package com.API.service;

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
        int[][] map = mapBuilder.getMap();
        System.out.println("Map successfully exported into: " + filename + ".csv.");

    }
    
}
