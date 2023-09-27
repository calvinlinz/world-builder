package com.API.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.API.dto.JoinRequest;
import com.API.dto.LeaveRequest;
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

    private final WorldService worldService;

    private final PeopleService peopleService;


    @Autowired
    public GameController(WorldService worldService, PeopleService peopleService) {
        this.worldService = worldService;
        this.peopleService = peopleService;
    }

    @PutMapping("/join")
    public ResponseEntity<int[][]> newPlayer(@RequestBody JoinRequest joinRequest) {
        boolean host = joinRequest.getHost();
        long id = peopleService.findNextId();
        String gameId = joinRequest.getGameId();
        Person player = new Person(id, host, gameId);
        peopleService.newPlayer(player);
        System.out.println(
                "Added ID: " + id + " to gameId " + gameId + ":  " + GameRepository.games.get(gameId).toString());
        System.out.println("Added ID: " + id + " to " + UserRepository.users.toString());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/leave")
    public ResponseEntity<int[][]> deletePlayer(@RequestBody LeaveRequest leaveRequest) {
        long id = leaveRequest.getId();
        peopleService.deletePersonById(id);
        System.out.println("Deleted ID: " + id + " from " + UserRepository.users.toString());
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