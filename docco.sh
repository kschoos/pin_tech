#!/bin/bash
find src/ | grep .js$ | while read -r line ; do
  _path=docs/$(expr match "$line" '\(.*/\)')
  docco $line -o $_path
done
