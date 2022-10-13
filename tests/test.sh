#!/usr/bin/env bash

APIKEY=`cat api_key.txt`

while read repo; do
  git clone $repo test_build 
  cd test_build
  npm i
  git checkout HEAD~2
  node ../../app/dist/devisible.js -k "$APIKEY" -b "client/dist" -c "npm run build"
  git checkout HEAD~1
  node ../../app/dist/devisible.js -k "$APIKEY" -b "client/dist" -c "npm run build"
  git checkout HEAD
  node ../../app/dist/devisible.js -k "$APIKEY" -b "client/dist" -c "npm run build"
  cd ..
  rm -rf test_build
done < test_repos.txt