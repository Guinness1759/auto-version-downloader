const request = require('request-promise-native');

const VERSION_PAGE_URL = 'https://www.rarlab.com/download.htm';

// Uses HTML regex manipulation. This is bad but for now there is no other way
module.exports = async (logger, netOptions) => {
    const version_page = await request(VERSION_PAGE_URL, { netOptions });
    const latest = version_page.match(/<a href="\/rar\/winrar-x64-(.*).exe">/)[1];
    return {
        [latest]: [
            `https://www.rarlab.com/rar/winrar-x64-${latest}.exe`,
        ],
    }
}