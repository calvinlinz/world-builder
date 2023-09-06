package com.API.service;

import com.API.model.Node;

public class AStarPathFinding {


    // Arrays for moving in four directions: right, left, down, up
    static int[] dx = {1, -1, 0, 0};
    static int[] dy = {0, 0, 1, -1};

    // Heuristic function to estimate the distance between two nodes (Manhattan distance)
    static int heuristic(Node a, Node b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    
}
