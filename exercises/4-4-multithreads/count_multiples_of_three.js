
module.exports = function count_multiples_of_three(array) {
	let counter = 0;
	const array1 = array.map((x) => (x % 3 == 0 ? 1 : 0));
	array1.forEach((x) => {
		counter += x;
	});
	return counter;
}