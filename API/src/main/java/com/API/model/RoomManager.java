package com.API.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class RoomManager {
    private Map<String, Room> rooms;

    public RoomManager() {
        rooms = new HashMap<>();
        initializeRooms();
    }

    private void initializeRooms() {
        // Add the rooms here with their dimensions and Id numbers
        rooms.put("5", new Room(5, 2, 2)); // 2x2 Building
        rooms.put("6", new Room(6, 2, 3)); // 2x3 Building
        rooms.put("7", new Room(7, 3, 3)); // 3x3 Building
        rooms.put("8", new Room(8, 4, 4)); // 4x4 Building
        rooms.put("9", new Room(9, 4, 6)); // 4x6 Building
        rooms.put("10", new Room(10, 5, 5)); // 5x5 Building
        rooms.put("11", new Room(11, 6, 3)); // 6x3 Building
        rooms.put("12", new Room(12, 6, 8)); // 6x8 Building
        rooms.put("13", new Room(13, 7, 8)); // 7x8 Building
    }

    public Room getRoom(String id) {
        return rooms.get(id);
    }

    
    public Room getRandomRoom(){
        Random random = new Random();
        
        //Generate a random number to pick a random room
        int randomNumber = random.nextInt(rooms.size()) + 1;
        
        // Turn random number into a string
        String randomKey = String.valueOf(randomNumber);
    
        return rooms.get(randomKey);

    }
}

