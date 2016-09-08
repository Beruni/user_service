#!/bin/bash -e

cd dist
docker build -f Dockerfile --tag user_service:v1 ../