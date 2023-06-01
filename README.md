
# Remote Call Manager (callmanager)

An open source project to build a twilio integration to support providing health care in remote locations from a distance.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
=======


### Installing on Linux Mint (RH)
Depending on what you have installed already this may take some work.
Remove old versions of node, npm and yarn if they are present (unless they are in use of course!)

You can use npm (node package manager) which is the traditional way of managing Javascript frameworks and packages 

Yarn is a newer and easier Javascript package manager for newbies 
```bash
sudo apt-get install yarn
```
The frameworks used to create Quasar are node.js and vue.js

Vue will complain if the node.js version is too old - likely the Ubuntu repository accessed by your package manager has an older vesion 
In my case it was 10.* when vue needs >=12.0

Add a PPA repo to your package lists with 
```bash
# Home directory
cd ~
# write a bash script to /tmp - inspect this for security with nano if you wish 
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
# run the script as root
sudo bash /tmp/nodesource_setup.sh
# download node.js 
sudo apt install nodejs
# Check the version 
node -v
# in my case it was 16.0
```
Now use Yarn to install vue 
```bash 
yarn add vue.js 
```
and create Quasar 
```bash
yarn create quasar
```
This should give you a dialog where you are asked for various options via the command line to set up your project 
Then navigate to your project folder and run 
```bash
quasar dev
```
This should create a running instance of Quasar and open a Quasar webpage at 
localhost:8080


