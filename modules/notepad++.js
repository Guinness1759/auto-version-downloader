const request = require('request-promise-native');

const VERSION_PAGE_URL = 'https://notepad-plus-plus.org/download';

// Uses HTML regex manipulation. This is bad but for now there is no other way
module.exports = async (logger, netOptions) => {
    const version_page = await request(VERSION_PAGE_URL, { netOptions });
    const link = version_page.match(/<a href=\"(.*)\">Notepad\+\+ Installer 64-bit x64<\/a>/)[1];
    return {
        [link.split('/')[3]]: [
            `https://notepad-plus-plus.org${link}`,
        ],
    }
}