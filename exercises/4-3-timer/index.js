const {performance} = require('perf_hooks');
const start = performance.now();
const usage = "Usage: node index.js xxHxxMxxS\n" +
"H:xx: 00-24\n" +
"M:xx: 00-60\n" +
"S:xx: 00-60\n" +
"Examples:\n" + 
"node index.js 00H00M00S\n" +
"node index.js 24h60m60s\n" +
"node index.js 01H01m01s";
const main = () => {
	const regex = new RegExp('^([0|1][0-9]|2[0-4])h([0-5][0-9]|60)m([0-5][0-9]|60)s$', 'i');
	const time = regex.exec(process.argv[2]);
	if (!time) {
		throw new Error(usage);
	}
	const sec = parseInt(time[1]) * 3600 +
				parseInt(time[2]) * 60 +
				parseInt(time[3]);
	setTimeout(() => {
		console.log(`The time is up!\n${parseInt(time[1])} hours ${parseInt(time[2])} minutes ${parseInt(time[3])} seconds have passed.`)
	}, sec * 1000);
}
main();
