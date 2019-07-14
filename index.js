const path = require('path');

const argv = require('./argv');

require('./polyfill');

const logger = {
	log: (name, version, link, e) => console.log(`${name}: ${version}`),
	error: (name, version, link, e) => console.error(`ERROR: ${e.toString()} ${'\n'} AT: ${name}: ${version}`),
}

require(path.resolve('./commands', argv._.first()))(logger, argv);
