const semver = require('semver');
const request = require('request-promise-native');

const VERSION_LIST_URL = 'https://data.services.jetbrains.com/products/releases?code=WS&latest=true&type=release';

module.exports = async (logger, netOptions) => {
    const latest = JSON.parse(await request(VERSION_LIST_URL, { netOptions }))
                            .WS.shift();

    return {
        [latest.build]: [ latest.downloads.windows.link ],
    }
}
