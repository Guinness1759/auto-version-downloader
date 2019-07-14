const fs = require('fs').promises;
const path = require('path');
const tunnel = require('tunnel');
const download = require('download');

async function get_downloads(modulesPath, logger, netOptions) {
    const files = await fs.readdir(modulesPath);
    const entries = files
        .filter(file => !file.startsWith('_'))
        .map(file => [path.basename(file, path.extname(file)), path.resolve(modulesPath, file)])
        .map(([key, value]) => [key, require(value)(logger, netOptions)]);
    return Object.fromEntries(entries);
}

async function do_download(programs, basePath, logger, agent) {
    const downloads = Object.entries(programs).map(async ([name, versions]) =>
        Object.entries(await versions).map(async ([version, files]) => {
            const baseDir = path.join(basePath, name, version);
            await fs.mkdir(baseDir, { recursive: true });

            return files.map(async link => {
                const res = download(link, baseDir, { agent });

                try {
                    await res;
                    logger.log(name, version, link);
                } catch (e) {
                    logger.error(name, version, link, e);
                }
                return res;
            });
        })
    ).flat(2);

    await Promise.all(downloads);
}

module.exports = async function (logger, config) {
    const netOptions = {
        proxy: {
            host: config.proxyHost,
            port: config.proxyPort,
            auth: {
                username: config.proxyUser,
                password: config.proxyPass,
            },
            protocol: config.proxyProtocol,
        },
    };

    const agent = tunnel.httpsOverHttp({
        proxy: {
            host: config.proxyHost,
            port: config.proxyPort,
            proxyAuth: `${config.proxyUser}:${config.proxyPass}`,
        },
    });

    const programs = await get_downloads(config.modulesPath, logger, netOptions);
    return await do_download(programs, config.path, logger, agent);
}
