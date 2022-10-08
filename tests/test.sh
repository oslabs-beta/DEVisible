#!/usr/bin/env bash

while read repo; do
  git clone $repo test_build 
  cd test_build
  npm i
  node ../../app/dist/devisible.js 
  cd ..
  rm -rf repo
done < test_repos.txt