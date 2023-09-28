package com.API.model;

public class Game {

    private int[][] world;
    private boolean roofs;
    private boolean caves;
    private double x;
    private double y;
    private boolean join;

    public Game(int[][] world, boolean roofs, boolean caves, double x, double y, boolean join) {
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

    public boolean isRoofs() {
        return roofs;
    }

    public void setRoofs(boolean roofs) {
        this.roofs = roofs;
    }

    public boolean isCaves() {
        return caves;
    }

    public void setCaves(boolean caves) {
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
