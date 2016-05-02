#!/bin/bash
x-terminal-emulator -e "babel --presets es2016,react -w src/ -d ."
x-terminal-emulator -e "sass --watch sass:public/css"
