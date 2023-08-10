package com.API.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.API.model.Person;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import java.io.FileReader;
import java.io.IOException;


@Service
public class PeopleService {

    private List<Person> personList;

    public PeopleService() {
        personList = new ArrayList<>();
        readData();
    }

    public void readData() {
        JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader("src/main/resources/db/users.json")) {
            // Parse the JSON file
            Object obj = jsonParser.parse(reader);
            JSONArray peopleJSON = (JSONArray) obj;

            // Process each JSON object representing a person
            for (Object personObj : peopleJSON) {
                if (personObj instanceof JSONObject) {
                    JSONObject personJSON = (JSONObject) personObj;
                    Long id = (Long) personJSON.get("id");
                    String name = (String) personJSON.get("name");
                    String email = (String) personJSON.get("email");
                    // Create a Person object and add it to the personList
                    personList.add(new Person(id, name, email));
                    System.out.println(personList.get(0).getId());
                }
            }

        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }

    public Optional<Person> getPersonById(Long id) {
        Optional<Person> optional = Optional.empty();
        for (Person person: personList) {
            if(id == person.getId()){
                optional = Optional.of(person);
                return optional;
            }
        }
        return optional;
    }

    public Optional<List<Person>> getPeople() {
        Optional<List<Person>> optional = Optional.of(personList);
        return optional;
    }
}

