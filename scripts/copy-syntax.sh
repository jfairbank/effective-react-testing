#!/bin/bash

FONT_SIZE=80
# FONT_FAMILY=Monaco
FONT_FAMILY=Hack
SYNTAX=js
OUTPUT=rtf
FILENAME="$1"
USE_HIGHLIGHT=true

if [[ $USE_HIGHLIGHT == true ]]; then
  STYLE=seashell
else
  STYLE=solarizedlight
fi

if [[ -z "$FILENAME" ]]; then
  >&2 echo 'Please supply filename'
  exit 1
fi

while getopts ":s:S:K" OPT; do
  case $OPT in
    s)
      STYLE="$OPTARG"
      shift 2
      ;;
    S)
      SYNTAX="$OPTARG"
      shift 2
      ;;
    K)
      FONT_SIZE="$OPTARG"
      shift 2
      ;;
    \?)
      exit 1
      ;;
  esac
done

FILENAME="$1"

if [[ -z "$FILENAME" ]]; then
  >&2 echo 'Please supply filename'
  exit 1
fi

if [[ $USE_HIGHLIGHT == true ]]; then
  highlight -s "$STYLE" -O "$OUTPUT" -S "$SYNTAX" -K "$FONT_SIZE" -k "$FONT_FAMILY" "$FILENAME" | tr -d '\n' | pbcopy
else
  pygmentize -f "$OUTPUT" -O "style=$STYLE,fontface=$FONT_FAMILY,fontsize=$FONT_SIZE" "$FILENAME" | pbcopy
fi
