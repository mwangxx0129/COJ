
#!/bin/bash
#
# ---------------------------------------------------------------------
# COJ startup script.
# ---------------------------------------------------------------------
#

# ---------------------------------------------------------------------
# Make sure rosuperuser permission.
# ---------------------------------------------------------------------
if [ $(id -u) != "0" ]; then
    echo "You must be the superuser to run this script" >&2
    exit 1
fi

if [ $(id -u) = "0" ]; then
    echo "superuser"
fi

# ---------------------------------------------------------------------
# Kill 3000 for oj-sever.
# Kill 5000 for executors.
# Start redis serveice.
# ---------------------------------------------------------------------

fuser -k 3000/tcp
fuser -k 5000/tcp
service redis_6379 start


# ---------------------------------------------------------------------
# Build bundle.js for dev.
# ---------------------------------------------------------------------
if [ "$1"="dev" ]; then
    cd ../oj-client
    npm install &
    echo "run ng build for dev..."
    ng build --watch &
fi

# ---------------------------------------------------------------------
# Start oj-server.
# ---------------------------------------------------------------------
cd ../oj-server
npm install &
if (nodemon server.js&); then
    echo "nodemon server.js & => success"
else
    echo "nodemon server.js & => fail"
fi

# ---------------------------------------------------------------------
# Start executor_server.
# ---------------------------------------------------------------------
cd ../executors
pip install -r requirements.txt
python executor_server.py 5000 &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

# ---------------------------------------------------------------------
# Clean environment.
# ---------------------------------------------------------------------
fuser -k 3000/tcp
fuser -k 5000/tcp
service redis_6379 stop

echo "Good bye;)"
exit 0
