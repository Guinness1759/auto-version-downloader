const yargs = require('yargs');
const bytes = require('bytes');

module.exports = yargs
    .command('download [path]', 'download programs', yargs => 
        yargs
            .positional('path', {
                describe: 'Path where files will be downloaded to',
                default: './downloads',
            })
            .option('zip-path', { type: 'string' })
            .option('zip-max-file-size', { 
                type: 'string',
                coerce: bytes.parse,
            })
    )
    .option('modules-path', { 
        type: 'string', 
        alias: 'm',
        default: './modules',
    })
    .option('proxy-host', { type: 'string' })
    .option('proxy-port', { type: 'number' })
    .option('proxy-user', { type: 'string' })
    .option('proxy-pass', { type: 'string' })
    .option('proxy-protocol', { type: 'string' })
    .implies('proxy-port', 'proxy-host')
    .implies('proxy-protocol', 'proxy-host')
    .implies('proxy-user', ['proxy-host', 'proxy-pass'])
    .implies('proxy-pass', ['proxy-host', 'proxy-user'])
    .strict()
    .argv;
