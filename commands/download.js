const fs = require('fs').promises;
const path = require('path');
const tunnel = require('tunnel');
const download = require('download');
const compressing = require('compressing');
const splitFile = require('split-file');

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
        await Promise.all(Object.entries(await versions).map(async ([version, files]) => {
            const baseDir = path.join(basePath, name, version);
            await fs.mkdir(baseDir, { recursive: true });

            const downloads = files.map(async link => {
                const res = download(link, baseDir, { agent });

                try {
                    await res;
                    logger.log(name, version, link);
                } catch (e) {
                    logger.error(name, version, link, e);
                }
            });

            return await Promise.all(downloads);
        }))
    );

    await Promise.all(downloads);
}

async function compress(dirPath, zipPath = `${dirPath}.zip`, maxFileSize = Number.MAX_SAFE_INTEGER) {
    await compressing.zip.compressDir(dirPath, zipPath);
    await splitFile.splitFileBySize(zipPath, maxFileSize);
}

module.exports = async function (logger, config) {
    let netOptions, agent;
    if (config.proxyHost) {
        netOptions = {
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

        agent = tunnel.httpsOverHttp({
            proxy: {
                host: config.proxyHost,
                port: config.proxyPort,
                proxyAuth: `${config.proxyUser}:${config.proxyPass}`,
            },
        });
    }

    const programs = await get_downloads(config.modulesPath, logger, netOptions);
    await do_download(programs, config.path, logger, agent);

    if (config.zipPath || config.zipMaxFileSize) {
        await compress(config.path, config.zipPath, config.zipMaxFileSize);
    }
}
