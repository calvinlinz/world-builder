package com.API.dto;

public class JoinRequest{
    private boolean host;
    private String gameId;

    public boolean getHost() {
        return this.host;
    }
    public void setHost(boolean host) {
        this.host = host;
    }

    public String getGameId() {
        return this.gameId;
    }
    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

}
