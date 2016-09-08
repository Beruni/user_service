#!/bin/bash -e

npm run build
npm --production=true install --prefix ./dist/node_modules
