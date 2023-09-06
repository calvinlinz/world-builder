package com.API.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

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

    // The following map codes are based on Ella's graphic front-end.

    // RANK SETS: BOSS, HARD, MEDIUM, AND EASY
    // The monsters will be ranked 0 = boss, 1 = hard, 2 = medium, 3 = easy
    private Set<Integer> allCodes = new HashSet<>(Set.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18));
    private Set<Integer> bossCodes = new HashSet<>(Set.of(13, 18));
    private Set<Integer> hardCodes = new HashSet<>(Set.of(10, 11, 12, 17));
    private Set<Integer> medCodes = new HashSet<>(Set.of(7, 8, 9, 16));
    private Set<Integer> easyCodes = new HashSet<>(Set.of(5, 6, 15));

    // TYPE SETS: HOUSE, CAVE, NATURE (MAYBE)
    private Set<Integer> houseCodes = new HashSet<>(Set.of(5, 6, 7, 8, 9, 10, 11, 12, 13));
    private Set<Integer> caveCodes = new HashSet<>(Set.of(15, 16, 17, 18));

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
        probabilities.add(52.0); // boss rank prob
        probabilities.add(48.0); // hard rank prob
        probabilities.add(30.0); // medium rank prob
        probabilities.add(15.0); // easy rank prob
    }

    public int[][] generateMonsters(){

        // Iterate through all the cells in the map and determine which are rooms.
        for(int i = 0; i < map.length; i++){
            for(int j = 0; j < map[i].length; j++){
                
                int cellValue = map[i][j]; // The current map cell.
                if(!allCodes.contains(cellValue)) continue; // An invalid cell to place a monster in.
                
                // Determine the rank of the monster based on the room value.
                int rank = determineRank(cellValue);

                // Generate a random number in the bracket given.
                // If it is the correct number, then generate a monster.

                double maxValue = probabilities.get(rank);
                int randomValue = (int)(rand.nextDouble() * maxValue);
                if(randomValue == 1){
                    
                    int rankVal = rank + 1; // The monster int cannot start with a 0 so range is 1-4.
                    int str = getSkill(rank);
                    int dex = getSkill(rank);
                    int con = getSkill(rank);
                    int intel = getSkill(rank);
                    int wis = getSkill(rank);
                    int cha = getSkill(rank);
                    int type = determineType(cellValue);
                    String currMonster = String.valueOf(rankVal) + String.valueOf(str) + String.valueOf(dex) + String.valueOf(con) + String.valueOf(intel) + String.valueOf(wis) + String.valueOf(cha) + String.valueOf(type);
                    System.out.println(currMonster);

                    this.map[i][j] = Integer.valueOf(currMonster);
                } 
            }
        }
        return this.map;
    }

    /**
     * Based on a map code, determine what rank the monster should be.
     * @param value A map code that exists inside the allCodes set.
     * @return A value corresponding to the rank of monster, e.g. boss, easy.
     */
    private int determineRank(int cell){
        if(bossCodes.contains(cell)) return 0; // boss
        else if(hardCodes.contains(cell)) return 1; // hard
        else if(medCodes.contains(cell)) return 2; // med
        else if(easyCodes.contains(cell)) return 3; // easy
        return 3;
    }

    /**
     * Based on a map code, determine what type the monster should be.
     * @param value A map code that exists inside the allCodes set.
     * @return A value corresponding to the type of monster, e.g. house, cave.
     */
    private int determineType(int cell){
        if(houseCodes.contains(cell)) return 0;
        else if(caveCodes.contains(cell)) return 1;
        return 2; // Any other types we may include. Currently will not do anything.

    }

    /**
     * Based on the rank of the monster (boss, hard, etc.), determine the skill strength.
     * 1 = 10%, 2 = 20%, 3 = 30%, ..., 9 = 90%, 0 = 100%.
     * @param rank A value corresponding to the rank of the monster.
     * @return An int 0-9 corresponding to the strength of the skill.
     */
    private int getSkill(int rank){
        return 2;
    }
    
}
