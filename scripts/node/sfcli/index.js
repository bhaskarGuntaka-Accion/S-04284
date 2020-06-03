const { cli } = require('cli-ux');
const { exec } = require('child_process');

module.exports = {
    sfdxInstalled: () => {
        return new Promise((resolve, reject) => {
            cli.action.start('Checking to see if the Salesforce CLI is installed');
            exec("sfdx --version", (error, stderr) => {
                if (error) {
                    reject(error, stderr);
                }
                else {
                    resolve();
                }
            });
        }).then(() => cli.action.stop('Installed!'));
    },

    openOrg: username => {
        return new Promise((resolve, reject) => {
            exec(`sfdx force:org:open -r -u ${username}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    },

    createOrg: (alias, configFile, duration) => {
        return new Promise((resolve, reject) => {
            exec(`sfdx force:org:create -a ${alias} -f ${configFile} -d ${duration} -s`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    },

    deleteOrg: username => {
        return new Promise((resolve, reject) => {
            exec(`sfdx force:org:delete -p -u ${username}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    },

    getOrgDetails: username => {
        return new Promise((resolve, reject) => {
            exec(`sfdx force:org:display -u ${username} --json`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr);
                }
                else {
                    resolve(JSON.parse(stdout));
                }
            });
        });
    },

    installPackage: (username, pkg, password) => {
        return new Promise((resolve, reject) => {
            cli.action.start(`Installing ${pkg.name}`);
            exec(`sfdx force:package:install -u ${username} -p ${pkg.packageId} -k ${password} -w 30 --json`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr, stderr);
                }
                else {
                    resolve(JSON.parse(stdout));
                }
            });
        }).then(() => cli.action.stop());
    },

    executeScript: (username, script) => {

        return new Promise((resolve, reject) => {
            cli.action.start(`Executing ${script.name} script`);
            exec(`sfdx force:apex:execute -u ${username} --apexcodefile ${script.location} --json`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr, JSON.parse(stdout));
                }
                else {
                    resolve(JSON.parse(stdout));
                }
            });
        }).then(() => cli.action.stop())
        .catch((error, stderr) => {
            console.error(error, stderr);
        });
    },

    displayUser: (username) => {

        return new Promise((resolve, reject) => {
            exec(`sfdx force:user:display -u ${username} --json`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr, JSON.parse(stdout));
                }
                else {
                    resolve(JSON.parse(stdout));
                }
            });
        });
    },

    pushSource: (username) => {

        return new Promise((resolve, reject) => {
            cli.action.start('Pushing source code');
            exec(`sfdx force:source:push -u ${username} --json`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr, JSON.parse(stdout));
                }
                else {
                    resolve(JSON.parse(stdout));
                }
            });
        }).then(() => cli.action.stop());
    },

    deploySource: (username) => {

        return new Promise((resolve, reject) => {
            cli.action.start('Deploying source code');
            exec(`sfdx force:source:deploy -u ${username} -p src --json`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr, JSON.parse(stdout));
                }
                else {
                    resolve(JSON.parse(stdout));
                }
            });
        }).then(() => cli.action.stop());
    },

    createdCommunity: (username, communityName, templatename) => {

        return new Promise((resolve, reject) => {
            cli.action.start('Creating Community');
            exec(`sfdx force:community:create -n ${communityName} -u ${username} -t ${templatename} -p ${communityName.toLowerCase()}--json`, (error, stdout, stderr) => {
                if (error) {
                    reject(error, stderr, JSON.parse(stdout));
                }
                else {
                    cli.wait(60000);
                    resolve(JSON.parse(stdout));
                }
            });
        });
    }
};
