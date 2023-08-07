package com.API.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String email;
    
    public Person(){

    }

    public Person(Long id, String name, String email){
        this.name = name;
        this.email = email;
    }

    public String getName(){
        return this.name;
    }
    public String getEmail(){
        return this.email;
    }
}
