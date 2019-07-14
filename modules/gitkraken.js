const request = require('request-promise-native');

const VERSION_PAGE_URL = 'https://www.gitkraken.com/download';

// Uses HTML regex manipulation. This is bad but for now there is no other way
module.exports = async (logger, netOptions) => {
    const version_page = await request(VERSION_PAGE_URL, { netOptions });
    const latest = version_page.match(/<strong>Latest release: (.*)<\/strong>/)[1];
    return {
        [latest]: [
			`https://release.gitkraken.com/win64/GitKrakenSetup.exe`,
        ],
    }
}
