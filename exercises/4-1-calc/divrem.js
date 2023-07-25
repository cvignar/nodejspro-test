module.exports = function divrem(firstNum, secondNum) {
	if (secondNum == 0)
		throw new Error("Can't divide by zero");
	return firstNum % secondNum;
}