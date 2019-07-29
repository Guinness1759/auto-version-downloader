const path = require('path');
const request = require('request-promise-native');

const VERSION_PAGE_URL = 'https://download.docker.com/linux/static/stable/x86_64/';

function basename(p) {
    return path.basename(p, path.extname(p));
}

// Uses HTML regex manipulation. This is bad but for now there is no other way
module.exports = async (logger, netOptions) => {
    const version_page = await request(VERSION_PAGE_URL, { netOptions });
	const versions = version_page.match(/href="([\w\d-.]*)"/g);
    const latest_parts = versions[versions.length - 1].split('"')[1].split('-');
    const latest = basename(latest_parts[latest_parts.length - 1]);
    return {
        [latest]: [
            `${VERSION_PAGE_URL}docker-${latest}.tgz`,
            `${VERSION_PAGE_URL}docker-rootless-extras-${latest}.tgz`,
        ],
    };
}
