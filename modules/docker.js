const path = require('path');
const request = require('request-promise-native');

const VERSION_PAGE_URL = 'https://download.docker.com/linux/static/stable/x86_64/';

// Uses HTML regex manipulation. This is bad but for now there is no other way
module.exports = async (logger, netOptions) => {
    const version_page = await request(VERSION_PAGE_URL, { netOptions });
	const versions = version_page.match(/href="([\w\d-.]*)"/g);
    const latest = versions[versions.length - 1].split('"')[1]
    return {
        [path.basename(latest.split('-')[1], path.extname(latest))]: [
			`${VERSION_PAGE_URL}${latest}`,
        ],
    }
}
