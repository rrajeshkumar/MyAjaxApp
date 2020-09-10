package com.main.java.ajax;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Sample {
	
	

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Sample o = new Sample();
		String flights = "Miami->Atlanta,100,Miami->Dallas,300,Miami->Chicago,600,Atlanta->Dallas,100,Atlanta->Chicago,400,Dallas->Chicago,200,Boston->Dallas,300,Dallas->Seattle,500";
		String from = "Miami";
		String to = "Dallas";
		int k =1;
		System.out.println(o.minCost(flights, from, to, k));
	}
	
	public int minCost(String flights, String from, String to, int k) {
        if(from == to) return 0;
        if(flights.isEmpty()) return -1;

        int[][] edges = parseString(flights,from, to);
        Map<Integer, Integer> minCostSet = new HashMap<>();
        minCostSet.put(0, 0);

        Queue<Integer> prev = new ArrayDeque<>(); //previous level of nodes
        prev.add(0);

        while(k >= 0 && !prev.isEmpty()) {  //BFS
            Queue<Integer> current = new ArrayDeque<>();
            for(int source: prev) {
                for(int destination = 0; destination < edges.length; destination++) {
                    if(edges[source][destination] > 0) {
                        int minCost = minCostSet.containsKey(destination) ? minCostSet.get(destination) : Integer.MAX_VALUE;
                        int newCost = Math.min(minCost, minCostSet.get(source) + edges[source][destination]);
                        if (minCost > newCost) {
                            minCostSet.put(destination, newCost);
                            current.add(destination);
                        }
                    }
                }
            }
            prev = current;
            k--;
        }
        return minCostSet.containsKey(edges.length - 1) ? minCostSet.get(edges.length - 1): -1;
    }
	
	private int[][] parseString(String flights, String start, String end) {
        Map<String, Integer> map = new HashMap<>();
        List<int[]> edges = new ArrayList<>();
        String[] f = flights.split(",");
        map.put(start, 0);
        map.put(end, -1);
        for(int i = 0; i < f.length; i+=2) {
            int idx = f[i].indexOf('-');
            String src = f[i].substring(0, idx);
            String des = f[i].substring(idx + 2);
            if(!map.containsKey(src)) {
                map.put(src, map.size() - 1);
            }
            if(!map.containsKey(des)){
                map.put(des, map.size() - 1);
            }
            if(map.get(src) != -1) {    //exclude flights that departs from the ultimate destination
                edges.add(new int[]{map.get(src), map.get(des), Integer.parseInt(f[i + 1])});
            }
        }
        int n = map.size();
        int[][] graph = new int[n][n];
        for(int[] edge: edges) {
            if(edge[1] == -1) edge[1] = n - 1;
            graph[edge[0]][edge[1]] = edge[2];
        }
        return graph;
    }

}
