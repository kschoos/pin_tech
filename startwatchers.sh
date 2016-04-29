#!/bin/bash
mate-terminal -e "babel --presets es2016,react -w src/ -d ."
mate-terminal -e "sass --watch sass:public/css"
