package com.API.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.API.model.Person;
import com.API.repository.GameRepository;
import com.API.repository.UserRepository;

// import org.json.simple.JSONArray;
// import org.json.simple.JSONObject;
// import org.json.simple.parser.JSONParser;
// import org.json.simple.parser.ParseException;

// import java.io.File;
// import java.io.FileReader;
// import java.io.FileWriter;
// import java.io.IOException;

@Service
public class PeopleService {

    public PeopleService() {
        // deleteAndCreateBlankJson();
    }

    // public void deleteAndCreateBlankJson() {
    //     File jsonFile = new File("src/main/resources/db/users.json");

    //     if (jsonFile.exists()) {
    //         if (jsonFile.delete()) {
    //             System.out.println("Existing users.json file deleted successfully.");
    //         } else {
    //             System.err.println("Failed to delete existing users.json file.");
    //             return;
    //         }
    //     }
    //     JSONArray emptyArray = new JSONArray();
    //     try (FileWriter writer = new FileWriter(jsonFile)) {
    //         writer.write(emptyArray.toJSONString());
    //         writer.flush();
    //         System.out.println("Blank users.json file created successfully.");
    //     } catch (IOException e) {
    //         System.err.println("Failed to create blank users.json file: " + e.getMessage());
    //     }
    // }


    public void newPlayer(Person person) {
        UserRepository.users.add(person);
        GameRepository.games.get(person.getGameId()).add(person);
        GameRepository.games.put(person.getGameId(), GameRepository.games.get(person.getGameId()));       
    }

    public Optional<Person> getPersonById(Long id) {
        Optional<Person> optional = Optional.empty();
        for (Person person : UserRepository.users) {
            if (id == person.getId()) {
                optional = Optional.of(person);
                return optional;
            }
        }
        return optional;
    }

    public Optional<Person> getHost(String gameId) {
        Optional<Person> optional = Optional.empty();
        for (Person person : GameRepository.games.get(gameId)) {
            if (gameId.equals(person.getGameId()) && person.isHost()) {
                optional = Optional.of(person);
                return optional;
            }
        }
        return optional;
    }

    public Optional<List<Person>> getUsersInGame(String gameId) {
        Optional<List<Person>> optional = Optional.of(GameRepository.games.get(gameId));
        return optional;
    }

    public Long findNextId() {
        Long maxId = UserRepository.users.stream()
                .map(Person::getId)
                .max(Long::compareTo)
                .orElse(0L);
        return maxId + 1;
    }

    public void deletePersonById(Long id) {
        String gameId = getPersonById(id).get().getGameId();
        UserRepository.users.removeIf(person -> id.equals(person.getId()));
        GameRepository.games.get(gameId).removeIf(person -> id.equals(person.getId()));
    }
}
