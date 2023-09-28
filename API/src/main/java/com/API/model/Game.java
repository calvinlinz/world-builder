package com.API.model;

public class Game {

    private int[][] world;
    private String roofs;
    private String caves;
    private double x;
    private double y;
    private boolean join;

    public Game(int[][] world, String roofs, String caves, double x, double y, boolean join) {
        this.world = world;
        this.roofs = roofs;
        this.caves = caves;
        this.x = x;
        this.y = y;
        this.join = join;
    }
    

    public int[][] getWorld() {
        return world;
    }

    public void setWorld(int[][] world) {
        this.world = world;
    }

    public String getRoofs() {
        return roofs;
    }

    public void setRoofs(String roofs) {
        this.roofs = roofs;
    }

    public String getCaves() {
        return caves;
    }

    public void setCaves(String caves) {
        this.caves = caves;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean isJoin() {
        return join;
    }

    public void setJoin(boolean join) {
        this.join = join;
    }

}
