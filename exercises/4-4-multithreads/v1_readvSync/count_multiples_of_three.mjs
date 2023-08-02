import * as fs from 'fs';
const returnInt = (el) => parseInt(el, 10);

const count_multiples_of_three = (fd, from, to) => {
	const base = 3;
	try {
		const array = [new Uint8Array(new ArrayBuffer(to - from))];
		fs.readvSync(fd, array, from, (err, bytesRead, buffers) => {
				if (err) {
					throw err;
				}
			});
		let filteredArray = new TextDecoder('utf-8').decode(array[0]).split('');
		filteredArray = filteredArray.map(returnInt).filter((el) => {
			return (el % base == 0);
		}).sort();
		return filteredArray.length;
	} catch (e) {
		console.error(e.message);
	}
}

export {count_multiples_of_three};