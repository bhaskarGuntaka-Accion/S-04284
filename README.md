# ProjectAspire

## Setup

### Prerequisites:
Salesforce CLI with Dev Hub authorized

Node.js *(See below for setup steps, if needed)*

### Create and Configure Scratch Org:
From the project root directory, run 

(Windows)

```
scripts/dev-init.bat -p <org alias to create> -u <installation key> 
```

or 

(MacOS/Linux)

```
scripts/dev-init.sh -p <org alias to create> -u <installation key>
```

*If you receive a permission denied error on Mac, you may need to change the permissions on the shell script. From the script directory, run* 

```
chmod +x ./dev-init.sh
```

#### Node setup 

(Windows)

Download the installer from [Nodejs.org](https://nodejs.org/en/download/)

(Mac/Linux)

Install nvm

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

*MacOS may prompt you to install developer tools. If so, proceed with the install, then re-run this command*

Restart terminal, and install node via nvm

```
nvm install --lts
```
