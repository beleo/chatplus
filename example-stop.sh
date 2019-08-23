#!/bin/sh
PORT=3000
PID=`lsof -t -i tcp:$PORT -s tcp:listen`
if [ -n "$PID" ]; then
	kill $PID
	echo "OK"
fi
