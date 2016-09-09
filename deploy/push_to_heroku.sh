#!/bin/bash

eval "$(docker-machine env default)"
heroku container:login
docker tag user_service:v0.0.1 registry.heroku.com/${CUSTOM_ENVIRONMENT}user-beruni/web
docker push registry.heroku.com/${CUSTOM_ENVIRONMENT}user-beruni/web