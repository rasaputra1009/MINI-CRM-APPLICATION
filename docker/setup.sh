#!/bin/bash

cd ..
npm install
composer install --ignore-platform-reqs
NODE_ENV_MAIN=prod gulp
