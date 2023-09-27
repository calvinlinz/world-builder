package com.API.model;

public class Person {
    private Long id;
    private boolean host;

    public Person(Long id, boolean host) {
        this.id = id;
        this.host = host;
    }

    public Long getId() {
        return this.id;
    }

    public boolean isHost() {
        return host;
    }

}
