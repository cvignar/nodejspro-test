import { workerData, parentPort } from 'worker_threads';
import { count_multiples_of_three } from './count_multiples_of_three.mjs';
const { fd, from, to } = workerData;


const compute = (fd, from, to) => {
	return count_multiples_of_three(fd, from, to);
};
	parentPort.postMessage(compute(fd, from, to));

