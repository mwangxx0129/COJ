[![Build Status](https://travis-ci.org/mwangxx0129/COJ.svg?branch=master)](https://travis-ci.org/mwangxx0129/COJ)

# Install VS code
```
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
```

```
sudo apt-get update
sudo apt-get install code # or code-insiders
```
# Install google-chrome-stable
- Add Key:
```
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
```
- Set repository:
```
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
```
- Install package:
```
sudo apt-get update 
sudo apt-get install google-chrome-stable
```

# COJ
How do I get set up?

# update
sudo apt-get update

# Install Terminator
sudo apt-get install terminator

# Install NodeJs: (root)

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

sudo apt-get install -y nodejs

# Install Nodemon

sudo npm install -g nodemon

# Install git

sudo apt-get install git

# Install angular/cli

sudo npm install -g @angular/cli

# Install Redis

wget http://download.redis.io/releases/redis-3.2.6.tar.gz

tar xzf redis-3.2.6.tar.gz

cd redis-3.2.6

make

sudo make install

cd utils

sudo ./install_server.sh

# Install python 2.7: This is installed already in Ubuntu

# Install pip:

(sudo apt-get update)

sudo apt install python-pip

sudo pip install Flask

# Install Docker:

curl -fsSL https://get.docker.com/ | sh

Setup docker permission:

sudo usermod -aG docker $(whoami)

(you need to logout and login again after set permission)

To start docker when the system boots: sudo systemctl enable docker

# Install Nginx
(For ubuntu 16.04) Add following two lines into /etc/apt/sources.list

deb http://nginx.org/packages/ubuntu/ xenial nginx

deb-src http://nginx.org/packages/ubuntu/ xenial nginx

Then run:

sudo apt-get update

sudo apt-get install nginx

# Trouble shooting
## redis
sudo apt-get install make

sudo apt-get install build-essential


