#!/bin/bash -e

eval "$(docker-machine env default)"
cd deploy
docker build -f Dockerfile --tag user_service:v0.0.1 ../