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

    // The following map codes are based on Ella's graphic front-end codes.
    // The monsters will be ranked 0 = boss, 1 = hard, 2 = medium, 3 = easy
    private final Set<Integer> ALL_CODES = new HashSet<>(Set.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18));
    private final Set<Integer> BOSS_CODES = new HashSet<>(Set.of(13, 18));
    private final Set<Integer> HARD_CODES = new HashSet<>(Set.of(10, 11, 12, 17));
    private final Set<Integer> MED_CODES = new HashSet<>(Set.of(7, 8, 9, 16));
    private final Set<Integer> EASY_CODES = new HashSet<>(Set.of(5, 6, 15));


    private final int GRASS_CODE = 0;
    private final int BUSH_CODE = 1;
    private final int TREE_CODE = 2;

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

    /**
     * Determine the probabilities of monsters spawning in each room.
     */
    private void initialiseProbs(){
        probabilities.add(52.0); // boss rank prob
        probabilities.add(40.0); // hard rank prob
        probabilities.add(35.0); // medium rank prob
        probabilities.add(27.0); // easy rank prob
    }

    /**
     * Determines if the cell is by a wall in a house.
     */
    private boolean byWall(int cellValue, int i, int j){
        boolean corner = false;
        if(map[i-1][j] != cellValue || map[i+1][j] != cellValue || map[i][j-1] != cellValue || map[i][j+1] != cellValue){
            corner = true;
        }
        return corner;
    }

    /**
     * Decide if a fairy should be spawned at given location based on surrounding natural features.
     * @param cellValue The value of the current cell.
     * @param i The row on the map.
     * @param j The column on the map.
     * @return The fairy value.
     */
    public int spawnFairy(int cellValue, int i, int j){
        if(i > 1 && i < map.length - 2 && j > 1 && j < map[i].length - 2){
            List<Integer> zone = new ArrayList<>(List.of(
                map[i-2][j], map[i-1][j-1], map[i-1][j], map[i-1][j+1], map[i][j-2], map[i][j-1],
                map[i][j+1], map[i][j+2], map[i+1][j-1], map[i+1][j], map[i+1][j+1], map[i+2][j]
            ));
            int numberNatural = 0;
            for(int count = 0; count < zone.size(); count++){
                if(zone.get(count) == TREE_CODE || zone.get(count) == BUSH_CODE) numberNatural += 1;
            }
            // If there are at least 3 natural features within the fairies range, spawn a fairy!
            if(numberNatural >= 5){
                int chances = rand.nextInt(28);
                if(chances == 2){
                    return makeFairy();
                }
                else return cellValue;
            }
        }
        return cellValue;
    }

    /**
     * Generate the monsters based on the cell it is sitting in.
     */
    public int[][] generateMonsters(){

        // Iterate through all the cells in the map and determine which are rooms.
        for(int i = 0; i < map.length; i++){
            for(int j = 0; j < map[i].length; j++){
                
                int cellValue = map[i][j]; // The current map cell.

                // If it is a grass block, then spawn fairy. If it is not a room block, then skip.
                // Otherwise we can try spawn a monster.
                if(cellValue == GRASS_CODE){
                    int fairy = spawnFairy(cellValue, i, j);
                    map[i][j] = fairy;
                    continue;
                } else if(!ALL_CODES.contains(cellValue)){
                    continue; // An invalid cell to place a monster in.
                }
                
                // If the cell is not on the edge of the map, then we can check if by the wall.
                if(i > 0 && i < map.length - 1 && j > 0 && j < map[i].length - 1){
                    if(byWall(cellValue, i, j)){
                        continue;
                    }
                } else continue; // If it is by the edge of map, do not spawn.
                

                // Determine the rank of the monster based on the room value.
                int rank = determineRank(cellValue);

                // Generate a random number in the bracket given.
                // If it is the correct number, then generate a monster.
                double maxValue = probabilities.get(rank);
                int randomValue = (int)(rand.nextDouble() * maxValue);
                if(randomValue == 1){
                    
                    int rankVal = rank + 1;
                    int str = getSkill(rank);
                    int dex = getSkill(rank);
                    int con = getSkill(rank);
                    int intel = getSkill(rank);
                    int wis = getSkill(rank);
                    int cha = getSkill(rank);
                    String currMonster = String.valueOf(rankVal) + String.valueOf(str) + String.valueOf(dex) + String.valueOf(con) + 
                                         String.valueOf(intel) + String.valueOf(wis) + String.valueOf(cha);

                    int input = Integer.parseInt(currMonster);
                    System.out.println(rankVal + " " + str + " " + dex + " " + con + " " + intel + " " + wis + " " + cha);
                    this.map[i][j] = input;
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
        if(BOSS_CODES.contains(cell)) return 0; // boss
        else if(HARD_CODES.contains(cell)) return 1; // hard
        else if(MED_CODES.contains(cell)) return 2; // med
        else if(EASY_CODES.contains(cell)) return 3; // easy
        return 3;
    }


    /**
     * Based on the rank of the monster (boss, hard, etc.), determine the skill strength.
     * 1 = 10%, 2 = 20%, 3 = 30%, ..., 9 = 90%, 0 = 100%.
     * @param rank A value corresponding to the rank of the monster.
     * @return An int 0-9 corresponding to the strength of the skill.
     */
    private int getSkill(int rank){
        int wildcard = rand.nextInt(8) + 1;
        if(wildcard == 1){
            return rand.nextInt(10);
        }
        List<Integer> lowerLimits = new ArrayList<>(List.of(7, 5, 2, 1));
        List<Integer> upperLimits = new ArrayList<>(List.of(10, 9, 8, 5));
        int lowerLimit = lowerLimits.get(rank);
        int upperLimit = upperLimits.get(rank);
        int skillLevel = rand.nextInt(upperLimit - lowerLimit + 1) + lowerLimit;
        if(skillLevel == 10) skillLevel = 0;
        return skillLevel;
    }

    /**
     * Create a random fairy with stats.
     * @return An integer representing the fairy.
     */
    private int makeFairy(){
        int rank = 3;
        int randomNumber = rand.nextInt(4) + 1;
        if(randomNumber == 1) rank = 2;

        int str = getSkill(rank);
        int dex = getSkill(rank);
        int con = getSkill(rank);
        int intel = getSkill(rank);
        int wis = getSkill(rank);
        int cha = getSkill(rank);
        String fairy = String.valueOf(rank + 1) + String.valueOf(str) + String.valueOf(dex) + String.valueOf(con) + 
                        String.valueOf(intel) + String.valueOf(wis) + String.valueOf(cha);

        int input = Integer.parseInt(fairy);
        return input;
    }
    
}
