package com.API.controller;

import com.API.model.Person;
import com.API.model.World;
import com.API.repository.PersonRepository;
import com.API.service.WorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class WorldController {

    private final WorldService worldService;

    private final PersonRepository personRepository;

    @Autowired
    public WorldController(WorldService worldService, PersonRepository personRepository){
        this.worldService = worldService;
        this.personRepository = personRepository;
    }

    //Get world (TEST)


    @GetMapping("/users")
    public ResponseEntity getAllUsers(){
        return ResponseEntity.ok(this.personRepository.findAll());
    }
    @GetMapping("/world")
    public World getUser(){
        Optional<World> world = worldService.getWorld(1);
        return (World) world.orElse(null);
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