package com.API.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.API.model.Person;

public class GameRepository {
    public static Map<String, List<Person>> games = new HashMap<>();
    public static Map<String, int[][]> currentMap = new HashMap<>();

}
