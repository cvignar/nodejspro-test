const { workerData, parentPort } = require('worker_threads');
const count_multiples_of_three = require('./count_multiples_of_three.js');
const { fd, from, to } = workerData;
const compute = async (fd, from, to) => {
	return await count_multiples_of_three(fd, from, to);
};
const asyncReadFileAndPost = async (fd, from, to) => {
	parentPort.postMessage(await compute(fd, from, to));
};

asyncReadFileAndPost(fd, from, to);
