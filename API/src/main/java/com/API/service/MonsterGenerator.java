package com.API.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class MonsterGenerator {

    /**
     * Contains the map to be exported.
     */
    private MapBuilder mapBuilder;

    /**
     * The map data extracted from the mapBuilder.
     */
    private int[][] map;

    private Random rand = new Random();

    private List<Double> probabilities = new ArrayList<>();

    // The monsters will be ranked
    // 999 = boss, 888 = hard, 777 = medium, 666 = easy
    private List<Integer> allMapCodes = new ArrayList<>(List.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18));
    private List<Integer> SMapCodes = new ArrayList<>(List.of(13, 18));
    private List<Integer> AMapCodes = new ArrayList<>(List.of(10, 11, 12, 17));
    private List<Integer> BMapCodes = new ArrayList<>(List.of(7, 8, 9, 16));
    private List<Integer> CMapCodes = new ArrayList<>(List.of(5, 6, 15));

    /**
     * Creates a MonsterGenerator object.
     * Given a MapBuilder, it can read the 2D array, apply new monster instances.
     * This new map with monsters can then be passed to the front end and displayed.
     * @param map
     */
    public MonsterGenerator(MapBuilder mapBuilder){
        System.out.println("Generating monsters!");
        this.mapBuilder = mapBuilder;
        this.map = this.mapBuilder.getMap();
        initialiseProbs();
    }

    private void initialiseProbs(){
        probabilities.add(52.0); // S rank prob
        probabilities.add(48.0); // A rank prob
        probabilities.add(24.0); // B rank prob
        probabilities.add(20.0); // C rank prob
    }

    public int[][] generateMonsters(){

        // Iterate through all the cells in the map and determine which are rooms.
        for(int i = 0; i < map.length; i++){
            for(int j = 0; j < map[i].length; j++){
                
                int value = map[i][j]; // The current map cell.
                if(!allMapCodes.contains(value)) continue; // An invalid cell to place a monster in.
                
                // Determine the rank of the monster based on the room value.
                int rank = determineRank(value);
                int rankVal = determineCode(rank);

                // Generate a random number in the bracket given.
                // If it is the correct number, then generate a monster.
                double maxValue = probabilities.get(rank);
                int randomValue = (int)(rand.nextDouble() * maxValue);
                if(randomValue == 1){
                    this.map[i][j] = rankVal;
                } 
            }
        }
        return this.map;
    }

    private int determineRank(int value){
        if(SMapCodes.contains(value)) return 0; // 999
        else if(AMapCodes.contains(value)) return 1; // 888
        else if(BMapCodes.contains(value)) return 2; // 777
        else if(CMapCodes.contains(value)) return 3; // 666
        return 3;
    }

    /**
     * Used to access the corresponding probability inside the List.
     * @param rank
     * @return
     */
    private int determineCode(int rank){
        if(rank == 0) return 999;
        else if(rank == 1) return 888;
        else if(rank == 2) return 777;
        else if(rank == 3) return 666;
        return 666;
    }
    
}
