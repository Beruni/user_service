#!/bin/bash -e

npm install
npm run build
npm --production=true install --prefix ./dist/node_modules
