const os = require('os');
const perf_hooks = require('perf_hooks');
const {Worker} = require('worker_threads');
const count_multiples_of_three = require('./count_multiples_of_three.js');

const performanceObserver = new perf_hooks.PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});
performanceObserver.observe({entryTypes: ["measure"]});

worker_counter = (array) => {
	return new Promise((resolve) => {
		const worker = new Worker('./worker.js', {
			workerData: {
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

const size = 300000;
const chunkCount = os.cpus().length;
const chunkSize = Math.round(size / chunkCount);
const array = new Array();

for (let i = 0; i < size; i++)
	array.push(Math.round(Math.random() * 100));

const chunkedArray = sprit(array, chunkSize);

one_thread = () => {
	performance.mark('start one');
	let result = count_multiples_of_three(array);
	performance.mark('end one');
	performance.measure('one_thread', 'start one', 'end one');
	console.log(`one_thread array has ${result} multiples of three`);
};

multiple_threads = async () => {
	let result = 0;
	performance.mark('start');
	for (chunk of chunkedArray)
		await Promise.all([worker_counter(chunk)]).then((value) => {
			result += value[0];
		});
	performance.mark('end');
	performance.measure('multiple_threads', 'start', 'end');
	console.log(`multiple_threads array has ${result} multiples of three`);
};

one_thread();
multiple_threads();