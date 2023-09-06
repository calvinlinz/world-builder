package com.API.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

import com.API.model.Node;

public class AStarPathFinding {


    // Arrays for moving in four directions: right, left, down, up
    static int[] dx = {1, -1, 0, 0};
    static int[] dy = {0, 0, 1, -1};

    // Heuristic function to estimate the distance between two nodes (Manhattan distance)
    static int heuristic(Node a, Node b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    // A* algorithm to find the shortest path between two nodes on a grid
    static List<Node> astar(Node start, Node end, int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        // Priority queue to keep track of nodes with the lowest estimated total cost
        PriorityQueue<Node> openSet = new PriorityQueue<>(Comparator.comparingInt((Node node) -> heuristic(node, end)));
        openSet.add(start);

        // Maps to store the optimal path and cost to reach each node
        Map<Node, Node> cameFrom = new HashMap<>();
        Map<Node, Integer> gScore = new HashMap<>();
        gScore.put(start, 0);

        while (!openSet.isEmpty()) {
            Node current = openSet.poll();

            // If the current node is the end node, reconstruct and return the path
            if (current.equals(end)) {
                List<Node> path = reconstructPath(cameFrom, current);
                return path;
            }

            // Explore neighbors of the current node
            for (int i = 0; i < 4; i++) {
                int newX = current.x + dx[i];
                int newY = current.y + dy[i];
                Node neighbor = new Node(newX, newY);

                // Check if the neighbor is within the grid boundaries and is passable
                if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && (grid[newX][newY] == 0 || grid[newX][newY] == 40) ) {
                    int tentativeGScore = gScore.get(current) + 1;
                    if (!gScore.containsKey(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                        cameFrom.put(neighbor, current);
                        gScore.put(neighbor, tentativeGScore);
                        openSet.add(neighbor);
                    }
                }
            }
        }

        // If no path is found, return null
        return null;
    }

    public static int[][]  makePaths(int[][] grid, ArrayList<Node> locations ) {
       
        for (int i = 0; i < locations.size()-1; i++) {
          
        // creates a path between 2 rooms    
        List<Node> path = astar(locations.get(i), locations.get(i+1), grid);

        // if path was created then we add it into the grid, represented by 40 in the grid
        if (path != null) {
            for (Node node : path) {
                grid[node.x][node.y] = 40;
            }
        } else {
            System.out.println("No path found.");
        }

        }
        
        //return the finished grid with paths in place
        return grid;

    }

    // Reconstruct the path from the destination node to the start node
    static List<Node> reconstructPath(Map<Node, Node> cameFrom, Node current) {
        List<Node> path = new ArrayList<>();
        while (current != null) {
            path.add(current);
            current = cameFrom.get(current);
        }
        return path;
    }
    
}
