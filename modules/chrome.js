const semver = require('semver');
const request = require('request-promise-native');

const VERSION_LIST_URL = 'https://omahaproxy.appspot.com/all.json';

module.exports = async (logger, netOptions) => {
    const versions_list = JSON.parse(await request(VERSION_LIST_URL, { netOptions }));
    const latest = versions_list.filter(x => x.os === 'win64').shift().versions.filter(x => x.channel === 'stable').shift().version;

    return {
        [latest]: [
			'https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BDEA9ABC7-09C9-492F-C423-AF820AC6DE94%7D%26lang%3Diw%26browser%3D4%26usagestats%3D0%26appname%3DGoogle%2520Chrome%26needsadmin%3Dtrue%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Ddefaultbrowser/chrome/install/ChromeStandaloneSetup64.exe'
        ],
    }
}
