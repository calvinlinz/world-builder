#!/bin/bash

# Function to find and kill a process using a given port
kill_process_using_port() {
  local port="$1"
  local pid=$(lsof -ti :$port)
  if [ -n "$pid" ]; then
    echo "Killing process $pid using port $port..."
    kill -9 "$pid"
  fi
}

# Initialize flags
install_flag=false
client_flag=false
server_flag=false
test_flag=false

cd API
server_port=8080
cd ../world-builder
client_port=3000
cd ..

# Parse command line arguments
while [ $# -gt 0 ]; do
  case "$1" in
    -install)
      install_flag=true
      ;;
    -client)
      client_flag=true
      ;;
    -server)
      server_flag=true
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
  shift
done

# Change to the server directory
cd API

# Restart the server
if [ "$server_flag" = true ]; then
  npx kill-port $server_port
  echo "Starting Java server..."
  mvn package
  java -jar target/api.jar &
fi

# Start the Express server if -server flag is provided or no flags are provided
if [ "$server_flag" = false ] && [ "$client_flag" = false ]  && [ "$test_flag" = false ]; then
  npx kill-port $server_port
  echo "Starting Java server..."
  mvn package
  java -jar target/api.jar &
fi


# Change back to the client directory
cd ../world-builder

# Install client dependencies if the -install flag is provided
if [ "$install_flag" = true ]; then
  echo "Installing client dependencies..."
  npm install
fi

# Start the React client server if -client flag is provided or no flags are provided
if [ "$client_flag" = true ]; then
  kill_process_using_port $client_port
  echo "Starting React client server..."
  npm start
fi

# Start the Express server if -server flag is provided or no flags are provided
if [ "$server_flag" = false ] && [ "$client_flag" = false ]; then
  kill_process_using_port $client_port
  echo "Starting React client server..."
  npm start
fi

# Exit the script
exit 0