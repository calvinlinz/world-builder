package com.API.model;

public class Person {
    private Long id;
    private boolean host;
    private String gameId;

    public Person(Long id, boolean host, String gameId) {
        this.id = id;
        this.host = host;
        this.gameId = gameId;
    }

    public Long getId() {
        return this.id;
    }

    public boolean isHost() {
        return host;
    }

    public String getGameId() {
        return gameId;
    }
}
