const semver = require('semver');
const request = require('request-promise-native');

const VERSION_LIST_URL = 'https://code.visualstudio.com/sha';

module.exports = async (logger, netOptions) => {
    const versions_list = JSON.parse(await request(VERSION_LIST_URL, { netOptions }))
                            .products.filter(x => x.platform.os === 'win32-x64');
    const stable = versions_list.find(x => x.build === 'stable');
    const insider = versions_list.find(x => x.build === 'insider');

    return {
        [stable.productVersion]: [ stable.url ],
        [insider.productVersion]: [ insider.url ],
    }
}
