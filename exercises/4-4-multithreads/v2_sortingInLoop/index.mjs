import * as os from 'os';
import * as perf_hooks from 'perf_hooks';
import { Worker } from 'worker_threads';
import { count_multiples_of } from './count_multiples_of.mjs';

const performanceObserver = new perf_hooks.PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});
performanceObserver.observe({entryTypes: ["measure"]});

const worker_counter = (num, array) => {
	return new Promise((resolve) => {
		const worker = new Worker('./worker.mjs', {
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

const split = (array, chunkSize) => {
	let result = [];
	let copy = [...array];
	while (copy.length > 0) {
		let chunk = copy.splice(0, (chunkSize <= copy.length ? chunkSize : copy.length));
		result.push(chunk);
	}
	return result;
}

const one_thread = (array) => {
	performance.mark('start one');
	let result = count_multiples_of(3, array);
	performance.mark('end one');
	performance.measure('one_thread', 'start one', 'end one');
	console.log(`one_thread array has ${result} multiples of three`);
};

const multiple_threads = async (chunkedArray) => {
	const workerProms = [];
	performance.mark('start');
	for (const chunk of chunkedArray)
		workerProms.push(worker_counter(3, chunk));
	const result = await Promise.all(workerProms);
	performance.mark('end');
	performance.measure('multiple_threads', 'start', 'end');
	console.log(`multiple_threads array has ${result.reduce((res, el) => res += el)} multiples of three`);
};

const size = 3000000;
const chunkCount = os.cpus().length;
const chunkSize = Math.round(size / chunkCount);
const array = new Array();
for (let i = 0; i < size; i++) {
	array.push(Math.random() > 0.5 ? Math.round(Math.random() * 100) : Math.round(Math.random() * 100).toString());
}
const chunkedArray = split(array, chunkSize);

multiple_threads(chunkedArray);
one_thread(array);
