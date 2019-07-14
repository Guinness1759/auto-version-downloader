const request = require('request-promise-native');

const VERSION_PAGE_URL = 'https://tortoisegit.org/download/';

// Uses HTML regex manipulation. This is bad but for now there is no other way
module.exports = async (logger, netOptions) => {
    const version_page = await request(VERSION_PAGE_URL, { netOptions });
    const latest = version_page.match(/download.tortoisegit.org\/tgit\/([^/]*)\/TortoiseGit/)[1];
    return {
        [latest]: [
			`https://download.tortoisegit.org/tgit/${latest}/TortoiseGit-${latest}-64bit.msi`,
        ],
    }
}