const github_api = require('./_github_api');

module.exports = async (logger, netOptions) => {
    return await github_api('git-for-windows/git', x => x.name.match(/\-64-bit.exe$/), logger, netOptions);
}
