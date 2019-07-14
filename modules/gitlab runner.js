const request = require('request-promise-native');

const VERSION_PAGE_URL = 'https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html';

// Uses HTML regex manipulation. This is bad but for now there is no other way
module.exports = async (logger, netOptions) => {
    const version_page = await request(VERSION_PAGE_URL, { netOptions });
    const latest = version_page.match(/<h1>GitLab Runner :: Release for (.*)<\/h1>/)[1];
    return {
        [latest]: [
            'https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64',
			'https://gitlab-runner-downloads.s3.amazonaws.com/latest/rpm/gitlab-runner_amd64.rpm',
            'https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-windows-amd64.exe',
        ],
    }
}
