#!/bin/bash

# Task 0: Assuming you already have PostgreSQL installed and configured with appropriate credentials.

# Task 1: Go to the "world-builder" directory and run "npm start"
cd world-builder
npm run start &  # The '&' will run the npm command in the background, allowing the script to continue

# Task 2: Go to the "API" directory, run "mvn package", and execute the jar file
cd ../API

# Task 3: Create the database and execute the SQL script using psql
psql -U user -d world-builder -f /db/world-builder.sql

mvn package
java -jar target/API-0.0.1-SNAPSHOT.jar