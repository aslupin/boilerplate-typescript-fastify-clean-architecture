#!/bin/bash

set -eux

HOST="http://localhost:8080/healthcheck"
isLaunched=false

wait_for_url() {
  echo "Testing $1 $0"
  bash -c 'while [[ "$(curl -s -o /dev/null -L -w ''%{http_code}'' ${0})" != "200" ]];\
  do echo "Waiting for ${0}" && sleep 2;\
  done' ${1}
  echo "OK!"
  curl -I $1
}

is_ready(){ 
  if nc -z localhost 8080 && nc -z localhost 5672 && nc -z localhost 27017 ;then 
    echo "stack is ready !"
    isLaunched=true
  fi
}

echo "Waiting API to launch on 8080, 5672 and 27017..."

while ! $isLaunched ; do  
  echo "waiting..."
  sleep 5
  is_ready 
  
done

wait_for_url ${HOST}

echo "APIs ready and launched"