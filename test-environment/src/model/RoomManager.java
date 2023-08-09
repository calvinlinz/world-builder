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
        rooms.put("1", new Room(1, 4, 4));
        rooms.put("2", new Room(2, 2, 3));
        rooms.put("3", new Room(3, 3, 3));
        rooms.put("4", new Room(4, 4, 6));
        rooms.put("5", new Room(5, 5, 5));
        rooms.put("6", new Room(6, 6, 3));
        rooms.put("7", new Room(7, 6, 8));
        rooms.put("8", new Room(8, 7, 8));
        rooms.put("9", new Room(9, 2, 2));
        // Add more rooms as we go...
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

