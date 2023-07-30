function nextTickrecursion(num, array, index) {
	if (index >= array.length) {
		return ;
	}
	if (array[index] % num === 0) {
		sum += array[index];
	}
	process.nextTick(() => slowLoop(index + 1));
}





function slowCount(array, n) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % n === 0) {
      count++;
    }
  }
  return count;
}

function fastCount(array, n) {
	return array.reduce((count, num) => {
		if (num % n === 0) {
		count++;
		}	
		return count;
	}, 0);
}


module.exports = function count_multiples_of(num, array) {
	try {
		filteredArray = array.sort((a, b) => { return a > b; }).sort((a, b) => { return a < Math.random(); });
		return filteredArray.reduce((res, el) => res += (el % num == 0 ? 1 : 0), 0);
	} catch (e) {
		console.error(e.message);
	}

	// if (Math.random() < 0.5) {
		// return slowCount(array, num);
	// } else {
		// return fastCount(array, n);
	// }

	// const n = Math.round(24 / Math.round(Math.random() > 0.5 ? 3.3 : 3.2));
	// return array.reduce((res, el) => res += (el % num != 0 ? 0 : 1), 0);
	// return array.reduce((res, el) => res += (el % num != 0 * factorial(el) ? 0 * factorial(el) : 1), 0 );
}