# COJ
This project is to build a web app that people can add their coding problems and edit the code on the same page just like google doc.
Click here to see the [demo](http://34.229.58.27:3000). 
You can share the problem url with others so that everyone who has the link can editor on the same page.

## Content
+ 1. Setup AWS EC2 ubuntu 16.04
+ 2. Config Linux environment
+ 3. Write a shell script to automate a build and deployment

## 1. Setup AWS EC2 ubuntu 16.04
### Read AWS EC2 linux instance carefully!!!
+ figure out the def. of instance, IAM, security group etc
+ read the Doc recursively until you understanding depends

### Some key points
+ inbound rules security group
+ open 2 IAM for backup
+ open 2 Linux instance for backup


## 2. Config Linux environment
+ AWS Linux 16.04
* [Set Up Environment](set_up_env.md)
+ (optioinal)Local Linux
* [Set Up Environment](set_up_env.md)

## 3. Write a shell script to automate a build and deployment
### shell script
If not familar with shell, read ref just 1~2 hour, making you life easy.
Then Try to writing or imitating on some business shell, like /bin under JetBrain
+ Ref: http://linuxcommand.org/lc3_writing_shell_scripts.php#contents

### Get repo from github 
```bash
git clone https://github.com/mwangxx0129/COJ.git
```

### Run on background
```
$ [sudo] npm install forever -g
forever start app.js
```


## TODO

+ deploy again on both aws and local

+ add config for ip port

+ search bar on UI

+ count of session on UI
