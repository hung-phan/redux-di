#!/usr/bin/env bash

source $(dirname "$0")/env/test.sh

mocha-typescript-watch --opts mocha.opts
