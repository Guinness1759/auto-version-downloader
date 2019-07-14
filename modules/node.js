const semver = require('semver');
const request = require('request-promise-native');

const VERSION_LIST_URL = 'https://nodejs.org/dist/index.json';

module.exports = async (logger, netOptions) => {
    const versions_list = JSON.parse(await request(VERSION_LIST_URL, { netOptions }));
    const current = versions_list.map(x => x.version).sort(semver.rcompare).shift();
    const lts = versions_list.filter(x => x.lts).map(x => x.version).sort(semver.rcompare).shift();

    return {
        [current]: [
			`https://nodejs.org/dist/${current}/node-${current}-linux-x64.tar.gz`,
			`https://nodejs.org/dist/${current}/node-${current}-x64.msi`,
			`https://nodejs.org/dist/${current}/node-${current}.tar.gz`,
        ],
        [lts]: [
			`https://nodejs.org/dist/${lts}/node-${lts}-linux-x64.tar.gz`,
			`https://nodejs.org/dist/${lts}/node-${lts}-x64.msi`,
			`https://nodejs.org/dist/${lts}/node-${lts}.tar.gz`,
        ],
    }
}
