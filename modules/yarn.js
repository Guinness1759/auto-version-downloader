const github_api = require('./_github_api');

module.exports = async (logger, netOptions) => {
    return await github_api('yarnpkg/yarn', x => x.name.match(/\.msi$/), logger, netOptions);
}
