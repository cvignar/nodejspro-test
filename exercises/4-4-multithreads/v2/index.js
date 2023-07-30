const os = require('os');
const perf_hooks = require('perf_hooks');
const {Worker} = require('worker_threads');
const count_multiples_of = require('./count_multiples_of.js');

const performanceObserver = new perf_hooks.PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});
performanceObserver.observe({entryTypes: ["measure"]});

worker_counter = (num, array) => {
	return new Promise((resolve) => {
		const worker = new Worker('./worker.js', {
			workerData: {
				num,
				array
			}
		});
		worker.on('message', (msg) => {
			resolve(msg);
		});
	});
}

const sprit = (array, chunkSize) => {
	let result = [];
	let copy = [...array];
	while (copy.length > 0) {
		let chunk = copy.splice(0, (chunkSize <= copy.length ? chunkSize : copy.length));
		result.push(chunk);
	}
	return result;
}

const size = 30000000;
const chunkCount = os.cpus().length;
const chunkSize = Math.round(size / chunkCount);
const array = new Array();

for (let i = 0; i < size; i++) {
	array.push(Math.random() > 0.5 ? Math.round(Math.random() * 100) : Math.round(Math.random() * 100).toString());
}
	// console.log(array);

const chunkedArray = sprit(array, chunkSize);

one_thread = () => {
	performance.mark('start one');
	let result = count_multiples_of(3, array);
	performance.mark('end one');
	performance.measure('one_thread', 'start one', 'end one');
	console.log(`one_thread array has ${result} multiples of three`);
};

multiple_threads = async () => {
	// performance.mark('end');
	const workerProms = [];
	performance.mark('start');
	for (chunk of chunkedArray)
		workerProms.push(worker_counter(3, chunk));
	const result = await Promise.all(workerProms);
	performance.mark('end');
	performance.measure('multiple_threads', 'start', 'end');
	console.log(`multiple_threads array has ${result.reduce((res, el) => res += el)} multiples of three`);
};

one_thread();
multiple_threads();