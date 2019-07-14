const request = require('request-promise-native');

const DL_LINK = 'https://dl.pstmn.io/download/latest/win64';

module.exports = async (logger, netOptions) => {
	const { headers } = await request(DL_LINK, { resolveWithFullResponse: true })
	const latest = headers['content-disposition'].match(/attachment; filename=Postman-win64-(.*)-Setup.exe/)[1];
    return { 
        [latest]: [
			DL_LINK,
        ],
    }
}
