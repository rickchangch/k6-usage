#!/bin/bash
set -e -u

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
ARG=""

while getopts "u:d:i:c" argv
do
  case $argv in
    u)  ARG="${ARG} -u $OPTARG"
        ;;
    d)  ARG="${ARG} -d $OPTARG"
        ;;
    i)  ARG="${ARG} -i $OPTARG"
        ;;
    c)  ARG="${ARG} -o cloud"
        ;;
  esac
done

k6 run ${ARG} script.js
