import java.util.List;
import java.util.ArrayList;
import java.util.Random;

public class RoomManager {
    private List<Room> rooms;

    public RoomManager() {
        rooms = new ArrayList<>();
        initializeRooms();
    }

    private void initializeRooms() {
        // Add the rooms here with their dimensions and Id numbers
        rooms.add(new Room(5, 2, 2)); // 2x2 Building
        rooms.add(new Room(6, 2, 3)); // 2x3 Building
        rooms.add(new Room(7, 3, 3)); // 3x3 Building
        rooms.add(new Room(8, 4, 4)); // 4x4 Building
        rooms.add(new Room(9, 4, 6)); // 4x6 Building
        rooms.add(new Room(10, 5, 5)); // 5x5 Building
        rooms.add(new Room(11, 6, 3)); // 6x3 Building
        rooms.add(new Room(12, 6, 8)); // 6x8 Building
        rooms.add(new Room(13, 7, 8)); // 7x8 Building
        // Add more rooms as we go...
    }

   public Room getRandomRoom(){
        Random random = new Random();
        
        //Generate a random number to pick a random room
        int randomNumber = random.nextInt(rooms.size());
    
        return rooms.get(randomNumber);
    }
}

class Room extends Element {
    public Room(int id, int height, int width) {
        super(id, height, width);
    }
}

