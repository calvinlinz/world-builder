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

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

@Service
public class PeopleService {

    private List<Person> personList;

    public PeopleService() {
        personList = new ArrayList<>();
        deleteAndCreateBlankJson();

    }

    public void deleteAndCreateBlankJson() {
        File jsonFile = new File("src/main/resources/db/users.json");

        if (jsonFile.exists()) {
            if (jsonFile.delete()) {
                System.out.println("Existing users.json file deleted successfully.");
            } else {
                System.err.println("Failed to delete existing users.json file.");
                return;
            }
        }
        JSONArray emptyArray = new JSONArray();
        try (FileWriter writer = new FileWriter(jsonFile)) {
            writer.write(emptyArray.toJSONString());
            writer.flush();
            System.out.println("Blank users.json file created successfully.");
        } catch (IOException e) {
            System.err.println("Failed to create blank users.json file: " + e.getMessage());
        }
    }

    public void readData() {
        personList.clear();
        JSONParser jsonParser = new JSONParser();
        try (FileReader reader = new FileReader("src/main/resources/db/users.json")) {
            Object obj = jsonParser.parse(reader);
            JSONArray peopleJSON = (JSONArray) obj;
            for (Object personObj : peopleJSON) {
                if (personObj instanceof JSONObject) {
                    JSONObject personJSON = (JSONObject) personObj;
                    Long id = (Long) personJSON.get("id");
                    boolean host = (boolean) personJSON.get("host");
                    personList.add(new Person(id, host));
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }

    public void newPlayer(Person person) {
        readData();
        personList.add(person);
        JSONArray peopleJSON = new JSONArray();
        for (Person p : personList) {
            JSONObject personJSON = new JSONObject();
            personJSON.put("id", p.getId());
            personJSON.put("host",p.isHost());
            peopleJSON.add(personJSON);
        }
        try (FileWriter writer = new FileWriter("src/main/resources/db/users.json")) {
            writer.write(peopleJSON.toJSONString());
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Optional<Person> getPersonById(Long id) {
        readData();
        Optional<Person> optional = Optional.empty();
        for (Person person : personList) {
            if (id == person.getId()) {
                optional = Optional.of(person);
                return optional;
            }
        }
        return optional;
    }

    public Optional<Person> getHost() {
        readData();
        Optional<Person> optional = Optional.empty();
        optional = Optional.of(personList.get(0));
        return optional;
    }

    public Optional<List<Person>> getPeople() {
        readData();
        Optional<List<Person>> optional = Optional.of(personList);
        personList.stream().min((p1, p2) -> p1.getId().compareTo(p2.getId()));
        return optional;
    }

    public Long findNextId() {
        readData();
        Long maxId = personList.stream()
                .map(Person::getId)
                .max(Long::compareTo)
                .orElse(0L);
        return maxId + 1;
    }

    public void deletePersonById(Long id) {
        readData();
        personList.removeIf(person -> id.equals(person.getId()));
        JSONArray peopleJSON = new JSONArray();
        for (Person p : personList) {
            JSONObject personJSON = new JSONObject();
            personJSON.put("id", p.getId());
            personJSON.put("host", p.isHost());
            peopleJSON.add(personJSON);
        }
        try (FileWriter writer = new FileWriter("src/main/resources/db/users.json")) {
            writer.write(peopleJSON.toJSONString());
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
