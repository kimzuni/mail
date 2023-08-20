#!/usr/bin/env bash

cd "`dirname ${0}`"/..
bundle exec jekyll serve --trace -H 0.0.0.0 -P 4001 -l
