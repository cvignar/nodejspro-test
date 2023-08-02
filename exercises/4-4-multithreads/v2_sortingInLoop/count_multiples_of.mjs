const count_multiples_of = (num, array) => {
	try {
		let filteredArray = [];
		for (let i = 0; i < 10; i++) {
			filteredArray = array.sort((a, b) => {
				return b < (Math.random() > 0.5 ? a : Math.pow(Math.random(), Math.random() * 50));
			});
		}
		return filteredArray.reduce((res, el) => res += (el % num == 0 ? 1 : 0), 0);
	} catch (e) {
		console.error(e.message);
	}
}

export {count_multiples_of};