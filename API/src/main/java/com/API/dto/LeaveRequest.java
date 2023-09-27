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

    private boolean roofs;

    public boolean getRoofs() {
        return roofs;
    }

    public void setRoofs(boolean roofs) {
        this.roofs = roofs;
    }

    private boolean caves;

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

    public boolean getCaves() {
        return this.caves;
    }

    public void setCaves(boolean caves) {
        this.caves = caves;
    }

}
