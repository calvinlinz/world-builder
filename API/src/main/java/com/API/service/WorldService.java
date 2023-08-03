package com.API.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import com.API.model.World;

@Service
public class WorldService {

    private List<World> worldList;

    public WorldService() {
        worldList = new ArrayList<>();

        World world = new World(1,"Test World");
        World world2 = new World(2,"Test World2");


        worldList.addAll(Arrays.asList(world,world2));
    }

    public Optional<World> getWorld(Integer id) {
        Optional<World> optional = Optional.empty();
        for (World world: worldList) {
            if(id == world.getId()){
                optional = Optional.of(world);
                return optional;
            }
        }
        return optional;
    }
}