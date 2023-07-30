const { parentPort, workerData } = require('worker_threads');
const count_multiples_of = require('./count_multiples_of.js');
const {num, array} = workerData;
const compute = (num, array) => {
	return count_multiples_of(num, array);
};

parentPort.postMessage(compute(num, array));