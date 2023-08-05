import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as perf_hooks from 'perf_hooks';
import { Worker } from 'worker_threads';
import { count_multiples_of_three } from './count_multiples_of_three.mjs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const performanceObserver = new perf_hooks.PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});
performanceObserver.observe({entryTypes: ["measure"]});

const worker_counter = (fd, from, to) => {
	return new Promise((resolve) => {

		const worker = new Worker('./worker.mjs', {
			workerData: {
				fd,
				from,
				to
			}
		});
		worker.once('message', (msg) => {
			resolve(msg);
		});
	});
}

const generateFile = (filename, size) => {
	try {
		const array = new Array();
		for (let i = 0; i < size; i++)
			array.push(Math.round(Math.random() * 9).toString());
		fs.writeFileSync(filename, array.join(''), (error) => {
			if (error) {
				throw error;
			}
		});
		console.log(`${filename} is generated`);
	} catch (e) {
		console.error(e.message);
	}
};

const one_thread = async (filename, size) => {
	let filehandle;
	try {
		filehandle = await fs.promises.open(filename, 'r+');
		performance.mark('start');
		const result = await count_multiples_of_three(filehandle.fd, 0, size);
		performance.mark('end');
		performance.measure('one_thread', 'start', 'end');
		console.log(`one_thread array has ${result} multiples of three`);
	} finally {
		if (filehandle) {
			await filehandle.close();
		}
	}
};

const multiple_threads = async (filename, size, chunkCount, chunkSize) => {
	let filehandles = [];
	try {
		for (let i = 0; i < chunkCount; i++) {
			filehandles.push(await fs.promises.open(filename, 'r+'));
		}
		const workerProms = [];
		performance.mark('start');
		for (let i = 0; i < chunkCount; i++) {
			workerProms.push(
				worker_counter(
					filehandles[i].fd,
					i * chunkSize,
					(i == chunkCount - 1) ? size : ((i + 1) * chunkSize)
				)
			);
		}
		const result = await Promise.all(workerProms);
		performance.mark('end');
		performance.measure('multiple_threads', 'start', 'end');
		console.log(`multiple_threads array has ${result.reduce((res,el) => res += el, 0)} multiples of three`);
	} finally {
		for (const filehandle of filehandles) {			
			if (filehandle) {
				await filehandle.close();
			}
		}
	}
}

const filename = path.join(__dirname + '/file.txt');
const fileSize = 3000000;
generateFile(filename, fileSize);

const chunkCount = os.cpus().length;
const chunkSize = Math.round(fileSize / chunkCount);
one_thread(filename, fileSize);
multiple_threads(filename, fileSize, chunkCount, chunkSize);
