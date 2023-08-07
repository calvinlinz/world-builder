package com.API.model;

public abstract class Element {
    private int id;
    private int height;
    private int width;

    public Element(int id, int height, int width) {
        this.id = id;
        this.height = height;
        this.width = width;
    }

    public int getId() {
        return id;
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }
}
