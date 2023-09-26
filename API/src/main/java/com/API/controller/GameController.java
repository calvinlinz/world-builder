package com.API.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.API.dto.JoinRequest;
import com.API.dto.LeaveRequest;
import com.API.dto.WorldRequest;
import com.API.model.Person;
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

    private int[][] currentMap;

    @Autowired
    public GameController(WorldService worldService, PeopleService peopleService) {
        this.worldService = worldService;
        this.peopleService = peopleService;
    }

    @PutMapping("/join")
    public ResponseEntity<int[][]> newPlayer(@RequestBody JoinRequest joinRequest) {
        boolean host = joinRequest.getHost();
        long id = peopleService.findNextId();
        Person player = new Person(id,host);
        peopleService.newPlayer(player);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/leave")
    public ResponseEntity<int[][]> deletePlayer(@RequestBody LeaveRequest leaveRequest) {
        long id = leaveRequest.getId();
        peopleService.deletePersonById(id);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/generate")
    public ResponseEntity<int[][]> postWorld(@RequestBody WorldRequest worldRequest) {
        int size = worldRequest.getSize();
        MapBuilder mb = new MapBuilder(size);
        mb.createMap();
        MonsterGenerator mg = new MonsterGenerator(mb);
        mb.setMap(mg.generateMonsters());
        MapExporter me = new MapExporter(mb);
        int[][] jsonContent = me.exportMap();
        this.currentMap = jsonContent;
        return ResponseEntity.ok(jsonContent);
    }

    @GetMapping("/view")
    public ResponseEntity<int[][]> getWorld(@RequestBody WorldRequest worldRequest) {
        if (currentMap != null) {
            return ResponseEntity.ok(currentMap);
        }
        return ResponseEntity.notFound().build();
    }

}