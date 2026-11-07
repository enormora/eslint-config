#!/bin/sh
unused=value
directory=`pwd`
echo $directory
echo '$directory'
for entry in $(ls); do
    printf "$entry"
done
cat input.txt | grep pattern
result=$(echo hello)
printf '%s\n' "$result"
cd /tmp
read answer
printf '%s\n' "$answer"
