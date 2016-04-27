#!/bin/bash
gnome-terminal -e "babel --presets es2016,react -w src/ -d ."
gnome-terminal -e "sass --watch sass:public/css"
