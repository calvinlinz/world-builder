package com.API.dto;

public class MessageBean {
    private long id;
    private String world;
    private String roofs;
    private String caves;
    private int players;
    private double x;
    private double y;
    private boolean join;

    public MessageBean(long id, String world, String roofs, String caves, int players, double x, double y, boolean join) {
        this.id = id;
        this.world = world;
        this.roofs = roofs;
        this.caves = caves;
        this.players = players;
        this.x = x;
        this.y = y;
        this.join = join;
    }

    public boolean getJoin() {
        return join;
    }

    public void setJoin(boolean join) {
        this.join = join;
    }

    public long getId() {
        return id;
    }

    public String getCaves() {
        return caves;
    }

    public String getRoofs() {
        return roofs;
    }

    public String getWorld() {
        return world;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setWorld(String world) {
        this.world = world;
    }

    public void setRoofs(String roofs) {
        this.roofs = roofs;
    }

    public void setCaves(String caves) {
        this.caves = caves;
    }

    public void setPlayers(int players) {
        this.players = players;
    }

    public int getPlayers() {
        return players;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getX() {
        return x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getY(){
        return y;
    }

}