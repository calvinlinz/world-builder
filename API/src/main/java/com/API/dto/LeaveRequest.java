package com.API.dto;

public class LeaveRequest {
    private long id;
    private String worldData;

    public String getWorldData() {
        return this.worldData;
    }

    public void setWorldData(String worldData) {
        this.worldData = worldData;
    }

    private String roofs;

    public String getRoofs() {
        return roofs;
    }

    public void setRoofs(String roofs) {
        this.roofs = roofs;
    }

    private String caves;

    private double x;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    private double y;

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCaves() {
        return this.caves;
    }

    public void setCaves(String caves) {
        this.caves = caves;
    }

}
