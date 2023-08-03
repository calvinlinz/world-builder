package com.API.controller;

import com.API.model.World;
import com.API.service.WorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class WorldController {

    private final WorldService worldService;

    @Autowired
    public WorldController(WorldService worldService){
        this.worldService = worldService;
    }

    //Get world (TEST)


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