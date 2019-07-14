const github_api = require('./_github_api');

module.exports = async (logger, netOptions) => {
    return await github_api('docker/compose', x => x.name.match(/\-Linux-x86_64$/), logger, netOptions);
}
