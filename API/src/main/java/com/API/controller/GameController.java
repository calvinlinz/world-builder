package com.API.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.API.dto.JoinRequest;
import com.API.dto.LeaveRequest;
import com.API.dto.MessageBean;
import com.API.dto.HostRequest;
import com.API.dto.ViewRequest;
import com.API.model.Person;
import com.API.repository.GameRepository;
import com.API.repository.UserRepository;
import com.API.service.MapBuilder;
import com.API.service.MapExporter;
import com.API.service.MonsterGenerator;
import com.API.service.PeopleService;
import com.API.service.WorldService;

@RestController
@RequestMapping("/game")
public class GameController {

    private final PeopleService peopleService;
    private final WorldService worldService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public GameController(WorldService worldService, PeopleService peopleService,
            SimpMessagingTemplate messagingTemplate) {
        this.worldService = worldService;
        this.peopleService = peopleService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/send/{dynamicVar}")
    public ResponseEntity<String> sendMessageToClient(@RequestBody MessageBean message,
            @PathVariable String dynamicVar) {
        messagingTemplate.convertAndSend("/session/" + dynamicVar, message);
        return ResponseEntity.ok("Message sent to clients.");
    }

    @PutMapping("/join")
    public ResponseEntity<Map<String, Object>> newPlayer(@RequestBody JoinRequest joinRequest) {
        boolean host = joinRequest.getHost();
        long id = peopleService.findNextId();
        String gameId = joinRequest.getGameId();
  
        Person  player = new Person(id, host, gameId); 
        peopleService.newPlayer(player);
        List<Person> players = GameRepository.games.get(gameId);
        System.out.println(
                 "Added ID: " + id + " to gameId " + gameId + ":  " + players.toString());
        System.out.println("Added ID: " + id + " to " + UserRepository.users.toString());
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("id", id);
        responseMap.put("players", players.size());
        MessageBean mbean = new MessageBean(-1, "", true, true, players.size(), (double)0,(double)0, true);
        sendMessageToClient(mbean, gameId);
        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/check")
    public ResponseEntity<Map<String, Object>> checkGameId(@RequestBody JoinRequest joinRequest) {
        boolean host = joinRequest.getHost();
        String gameId = joinRequest.getGameId();
        if(host){
            if(!GameRepository.games.containsKey(gameId)){
                return ResponseEntity.ok().build();
            }
            if(GameRepository.games.get(gameId).stream().anyMatch(p -> p.isHost())){
                return ResponseEntity.badRequest().build();
            }
        }else{
            if(!GameRepository.games.containsKey(gameId)){
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok().build();
    }

    

    @DeleteMapping("/leave")
    public ResponseEntity<int[][]> deletePlayer(@RequestBody LeaveRequest leaveRequest) {
        long id = leaveRequest.getId();
        String world = leaveRequest.getWorldData();
        boolean caves = leaveRequest.getCaves();
        boolean roofs = leaveRequest.getRoofs();
        double x = leaveRequest.getX();
        double y = leaveRequest.getY();
        Person person = peopleService.getPersonById(id).get();
        String gameId = person.getGameId();
        peopleService.deletePersonById(id);
        int players = GameRepository.games.get(gameId).size();
        MessageBean mbean = new MessageBean(-1, world, roofs, caves, players, x, y, false);
        System.out.println(caves);
        System.out.println("Deleted ID: " + id + " from " + UserRepository.users.toString());
        sendMessageToClient(mbean, gameId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/generate")
    public ResponseEntity<int[][]> postWorld(@RequestBody HostRequest hostRequest) {
        int size = hostRequest.getSize();
        String gameId = hostRequest.getGameId();
        MapBuilder mb = new MapBuilder(size);
        mb.createMap();
        MonsterGenerator mg = new MonsterGenerator(mb);
        mb.setMap(mg.generateMonsters());
        MapExporter me = new MapExporter(mb);
        int[][] jsonContent = me.exportMap();
        GameRepository.currentMap.put(gameId, jsonContent);
        return ResponseEntity.ok(jsonContent);
    }

    @PostMapping("/view")
    public ResponseEntity<int[][]> getWorld(@RequestBody ViewRequest viewRequest) {
        String gameId = viewRequest.getGameId();
        int[][] currentMap = GameRepository.currentMap.get(gameId);
        if (currentMap != null) {
            return ResponseEntity.ok(currentMap);
        }
        return ResponseEntity.notFound().build();
    }

}