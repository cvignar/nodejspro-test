import { parentPort, workerData } from 'worker_threads';
import { count_multiples_of } from './count_multiples_of.mjs';
const { num, array } = workerData;


const compute = (num, array) => {
	return count_multiples_of(num, array);
};

parentPort.postMessage(compute(num, array));