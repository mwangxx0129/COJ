#!/bin/bash

fuser -k 3000/tcp
fuser -k 5000/tcp

service redis_6379 start
cd ./oj-server
npm install
if (nodemon server.js&); then
    echo "nodemon server.js & => success"
else
    echo "nodemon server.js & => fail"
fi

cd ../oj-client
npm install
ng build --watch &
cd ../executors
pip install -r requirements.txt
python executor_server.py 5000 &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
service redis_6379 stop
