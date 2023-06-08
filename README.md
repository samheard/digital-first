
# Digital First in Remote Communities 

An open source project to support the delivery of Health Care in Remote locations, using the Twilio communication system and the Quasar web framework.
Components for development (current prototype):
1) A Twilio plugin to take the number called and log details, to show a list of people who have called on that number, and log details about the caller, access information about that locality including maps, details of closest clinic, air strips and other distances (currently the 1st or caller page in the Quasar project)
2) A Quasar web page which launches committed to a single location - controlling entry to the facility, control of the video cameras and voice, remote monitoring and dispensing. This component (currently pages 2 - Entry, 3 - Video, 4 - Monitoring and 5 - Dispensing in the Quasar project) will need to have the video feeds, entry controls, monitoring and dispensing controls extracted into a location specific set up. 
3) Remote Call DB a separate database project using Express and better-sqlite to store and retrieve information, logs and dispensing information.

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


### Installing on Linux Mint (RH)
Depending on what you have installed already this may take some work.
Remove old versions of node, npm and yarn if they are present (unless they are in use of course!)

You can use npm (node package manager) which is the traditional way of managing Javascript frameworks and packages 

Yarn is a newer and easier Javascript package manager for newbies 
```bash
sudo apt-get install yarn
```
There seems to be some dispute over names (!!) a program called cmdtest may be selected which has no relation to yarn.

See the discussion groups for a solution.

The frameworks used to create Quasar are node.js and vue.js

Vue will complain if the node.js version is too old - likely the Ubuntu repository accessed by your package manager has an older version 
In my case it was 10.* when vue needs >=12.0

Add a PPA repo to your package lists with 
```bash
# Home directory
cd ~
```
```bash
# write a bash script to /tmp - inspect this for security with nano if you wish 
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
```
```bash
# run the script as root
sudo bash /tmp/nodesource_setup.sh
```
```bash
# download node.js 
sudo apt install nodejs
```
```bash
# Check the version 
node -v
```
In my case it was 16.0

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
vue add quasar
quasar dev
```
This should create a running instance of Quasar and open a Quasar webpage at 
localhost:8080

But if the project home folder is blank the index will default to the Quasar front page 

### To get a running instance of this code:
Clone this repo to the folder where you intend to edit/run the app
```bash
# navigate to project folder 
cd `~/../<project_folder> 
git clone https://github.com/samheard/digital-first
```
Create another instance of the Quasar server 
Note that you have to be outside the project folder 
```bash
yarn create quasar
```
Edit the various options presented on the CLI 

Generally accept the defaults

Navigate to /<project folder>/digital-first
  
Add quasar to vue with 
```bash
vue add quasar
```
You will be asked whether to modify some files - dont!
  
Otherwise you will end up with the default webpage again 
  
Then start the server with
```bash
yarn quasar dev
```
If all is well you should see the current state of the project 
### The Database for the project can be found at 
```bash
git clone https://github.com/samheard/RemoteCalldB
```
Follow the Readme.md to install 
