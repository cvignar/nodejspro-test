const { parentPort, workerData } = require('worker_threads');
const count_multiples_of_three = require('./count_multiples_of_three.js');
const compute = ({array}) => {
	return count_multiples_of_three(array);
};

parentPort.postMessage(compute(workerData));