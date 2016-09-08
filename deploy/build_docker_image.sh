#!/bin/bash -e

cd deploy
docker build -f Dockerfile --tag user_service:v0.0.1 ../