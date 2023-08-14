package com.API;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.API.service.MapBuilder;
import com.API.service.MapExporter;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);

		MapBuilder mb = new MapBuilder(81, 54);
		mb.createMap();
		MapExporter me = new MapExporter(mb);
		me.exportMap("file");
	}

}
