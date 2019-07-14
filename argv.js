const yargs = require('yargs');

module.exports = yargs
    .command('download [path]', 'download programs', yargs => 
        yargs
            .positional('path', {
                describe: 'Path where files will be downloaded to',
                default: './downloads',
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
