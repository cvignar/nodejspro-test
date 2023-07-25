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
	if (time == null) {
		console.log(usage);
		return ;
	}
	const sec = parseInt(time[3]) +
	parseInt(time[2]) * 60 +
	parseInt(time[1]) * 3600;
	setTimeout(() => {
		let now = (performance.now() - start) / 1000;
		let hours = Math.floor(now/3600);
		now -= hours*3600;
		let minutes = Math.floor(now/60);
		now = Math.floor(now - Math.floor(minutes*60));
		console.log(`The time is up!\n${hours} hours ${minutes} minutes ${now} seconds have passed.`)
	}, sec * 1000);
}
main();
