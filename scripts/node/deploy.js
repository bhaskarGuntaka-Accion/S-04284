const sfcli = require('./sfcli');
const yargs = require('yargs');
const path = require('path');
const {cli} = require('cli-ux');

const dirname = process.cwd().split(path.sep).pop();

const packages = [{
    name: 'ApexMocks',
    packageId: '04t0h000001IrZEAA0',
},{
    name: 'ArgsHelper',
    packageId: '04t0h000001EktFAAS',
},{
    name: "ProjectNextUnlocked",
    packageId: "04t0h0000016NYNAA2"
}];

const scripts = [{
    name: 'Config User',
    location: 'scripts/apex/configUser.apex'
}, {
    name: 'Create Platform User',
    location: 'scripts/apex/createPlatformUser.apex'
}];

const argv = yargs
    .option('username', {
        description: 'The username (or alias) of the org to install to. This org must be authorized in the Salesforce CLI',
        alias: 'u',
        type: 'string',
        default: dirname
    })
    .option('password', {
        description: 'The password for installing the packages',
        alias: 'p',
        type: 'string'
    })
    .demand(['p'])
    .help()
    .alias('help', 'h')
    .argv;

let exit = () => {
    process.exit(1);
};

(async () => {

    await sfcli.sfdxInstalled()
        .catch((error) => {
            console.error("Unable to locate the Salesforce CLI. See ReadMe for installation steps");
            console.log(error);
            exit();
        });

    let orgDetails = await sfcli.getOrgDetails(argv.username)
        .catch(() => {
            // no error, just means we need to check if we need to create a scratch org.
        });

    if (!orgDetails && await cli.confirm('Org not found - create a new Scratch Org?')) {
        cli.action.start(`Creating scratch org with alias ${argv.username}`);
        await sfcli.createOrg(argv.username, 'config/project-scratch-def.json', 7); // could change this to a list of options?
        cli.action.stop();
    }
    else if (orgDetails.result.hasOwnProperty('status') && /*orgDetails.result.status === 'Active' &&*/ await cli.confirm('Is this a scratch org?')) {
        if (await cli.confirm('Continuing will delete and refresh the scratch org. Continue?')) {
            cli.action.start(`Refreshing scratch org named '${argv.username}'`);
            await sfcli.deleteOrg(argv.username);
            await sfcli.createOrg(argv.username, 'config/project-scratch-def.json', 7); // could change this to a list of options?
            cli.action.stop('Refresh complete');
        }
    }
    else {
        // processing as normal?
    }

    // install packages
    for (const pkg of packages) {
        await sfcli.installPackage(argv.username, pkg, argv.password)
            .catch(error => {
                console.error(error);
                exit();
            });
    }

    // push org config
    await sfcli.deploySource(argv.username)
        .catch((error, stdout) => {
            console.error(error, stdout);
        });

    // execute scripts
    for (const script of scripts) {
        await sfcli.executeScript(argv.username, script)
            .catch(() => {
                exit();
            });
    }

    // display user and login url
    await sfcli.displayUser(argv.username)
        .then(result => {
            console.log(result);
        }, error => {
            console.error(error);
            exit();
        });

    await sfcli.openOrg(argv.username)
        .then(result => {
            console.log(result);
        }, error => {
            console.error(error);
            exit();
        });
})();