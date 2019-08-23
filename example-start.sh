#!/bin/sh

export ROOT_URL=http://your-domain.com:3000/
export MONGO_URL=mongodb://localhost:27017/rocketchat
export ADMIN_EMAIL=admin@example.com
export ADMIN_PASS=admin_password
export PORT=3000

LOG=chat_plus.log

node main.js 2>&1 >$LOG &
