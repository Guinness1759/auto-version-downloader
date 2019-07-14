const request = require('request-promise-native');
const path = require('path');

module.exports = async (repo, asset_filter, logger, netOptions) => {
	const { tag_name, assets } = JSON.parse(await request({
        url: `https://api.github.com/repos/${repo}/releases/latest`,
        netOptions,
        headers: {'User-Agent': 'nodejs'}
    }));

    return {
        [tag_name]: assets.filter(asset_filter).map(x => x.browser_download_url),
    }
}
