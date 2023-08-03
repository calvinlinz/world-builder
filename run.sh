#!/bin/bash

# Task 1: Go to the "world-builder" directory and run "npm start"
cd world-builder
(npm run start&)
cd ..

# Task 2: Go to the "API" directory, run "mvn package", and execute the jar file
cd API
mvn package
java -jar target/API-0.0.1-SNAPSHOT.jar
