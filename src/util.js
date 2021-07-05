function notFound(val) {
    let mode
    if(val === null || val === undefined) {
        mode = true
    }
    else {
        mode = false
    }
    return mode

}
function error(text) {
    return new TypeError(`daniel.db => ${text}`)
}

async function checkForUpdates() {
    if (!require('node-fetch')) return;
    const packageData = await require('node-fetch')(`https://registry.npmjs.com/daniel.db`).then(text => text.json())
    if (require('../package.json').version !== packageData['dist-tags'].latest) {
        console.log('\n\n')
        console.log('\x1b[32m' + '---------------------------------------------------')
        console.log('\x1b[32m' + '| daniel.db                                - [] X |')
        console.log('\x1b[32m' + '---------------------------------------------------')
        console.log('\x1b[33m' + `|            The package is\x1b[31m out of date!\x1b[33m          |`)
        console.log('\x1b[35m' + '|             New version is available!           |')
        console.log('\x1b[34m' + `|                  ${require('../package.json').version} --> ${packageData['dist-tags'].latest}            |`)
        console.log('\x1b[36m' + '|             Run "npm i daniel.db@latest"        |')
        console.log('\x1b[36m' + '|                    to update!                   |')
        console.log('\x1b[37m' + `|          View the full documentation here:      |`)
        console.log('\x1b[31m' + '|       https://www.npmjs.com/package/daniel.db   |')
        console.log('\x1b[32m' + '---------------------------------------------------\x1b[37m')
        console.log('\n\n')
    }
}
module.exports = { notFound, error, checkForUpdates }