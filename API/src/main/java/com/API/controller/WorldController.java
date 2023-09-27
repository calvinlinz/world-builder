package com.API.controller;

import com.API.dto.WorldRequest;
import com.API.model.Person;
import com.API.service.MapBuilder;
import com.API.service.MapExporter;
import com.API.service.MonsterGenerator;
import com.API.service.ForestGenerator;
import com.API.service.PeopleService;
import com.API.service.WorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;

import java.util.List;
import java.util.Optional;

@RestController
public class WorldController {

    private final WorldService worldService;

    private final PeopleService peopleService;

    @Autowired
    public WorldController(WorldService worldService, PeopleService peopleService){
        this.worldService = worldService;
        this.peopleService = peopleService;
    }


    @PostMapping("/world")
    public ResponseEntity<int[][]> postWorld(@RequestBody WorldRequest worldRequest) {
        int size = worldRequest.getSize();
        MapBuilder mb = new MapBuilder(size);
		mb.createMap();
        mb.setMap(new ForestGenerator(mb, size).generateForests());
        mb.setMap(new MonsterGenerator(mb).generateMonsters());
        MapExporter me = new MapExporter(mb);
        int[][] jsonContent = me.exportMap();
        return ResponseEntity.ok(jsonContent);
    }


}