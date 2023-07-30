const fs = require('fs');
module.exports = count_multiples_of_three = async (fd, from, to) => {
	const base = 3;
	try {
		array = [new Uint8Array(new ArrayBuffer(to - from))];
		fs.readv(fd, array, from, (err, bytesRead, buffers) => {
			if (err) {
				throw err;
			}
		});
		filteredArray = new TextDecoder('utf-8').decode(array[0]).split('');
		filteredArray = filteredArray.filter((el) => {
			return (parseInt(el) % base == 0);
		}).sort((a, b) => { return a > b; });
		return filteredArray.reduce((res, el) => res += (el % base == 0 ? 1 : 0), 0);
	} catch (e) {
		console.error(e.message);
	}
}