package com.API.controller;

import com.API.model.Person;
import com.API.service.MapBuilder;
import com.API.service.MapExporter;
import com.API.service.PeopleService;
import com.API.service.WorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/users")
    public ResponseEntity<List<Person>> getAllUsers() {
        Optional<List<Person>> optionalPeople = peopleService.getPeople();
        if (optionalPeople.isPresent()) {
            List<Person> people = optionalPeople.get();
            return ResponseEntity.ok(people);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/world")
    public ResponseEntity<int[][]> getWorld(){
		MapBuilder mb = new MapBuilder(81, 54);
		mb.createMap();
		MapExporter me = new MapExporter(mb);
        int[][] csvContent = me.exportMap();
        return ResponseEntity.ok(csvContent);
    }

    /**  
     * Get world by ID 
     * Syntax is as follows: localhost:8080/world?id={ID}
     * 
    */
    // @GetMapping("/world")
    // public World getUser(@RequestParam Integer id){
    //     Optional<World> world = worldService.getWorld(id);
    //     return (World) world.orElse(null);
    // }
}