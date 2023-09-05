package com.API.service;

import java.util.ArrayList;
import java.util.List;

public class MonsterGenerator {

    /**
     * Contains the map to be exported.
     */
    private MapBuilder mapBuilder;

    /**
     * The map data extracted from the mapBuilder.
     */
    private int[][] map;

    private List<Integer> mapCodes = new ArrayList<>();


    /**
     * Creates a MonsterGenerator object.
     * Given a MapBuilder, it can read the 2D array, apply new monster instances.
     * This new map with monsters can then be passed to the front end and displayed.
     * @param map
     */
    public MonsterGenerator(MapBuilder mapBuilder){
        this.mapBuilder = mapBuilder;
        this.map = this.mapBuilder.getMap();
    }

    private void generateMonsters(){
        for(int i = 0; i < map.length; i++){
            for(int j = 0; j < map[i].length; j++){
                


            }
        }
    }
    
}
