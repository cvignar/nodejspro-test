function add(firstNum, secondNum) {
	return firstNum + secondNum;
}

function divide(firstNum, secondNum) {
	if (secondNum == 0)
		throw new Error("Can't divide by zero");
	return firstNum / secondNum;
}

function divrem(firstNum, secondNum) {
	if (secondNum == 0)
		throw new Error("Can't divide by zero");
	return firstNum % secondNum;
}

function multiply(firstNum, secondNum) {
	return firstNum * secondNum;
}

function power(firstNum, secondNum) {
	return Math.pow(firstNum, secondNum);
}

function _root(firstNum, secondNum) {
	return Math.pow(firstNum, 1 / secondNum);
}

function substract(firstNum, secondNum) {
	return firstNum - secondNum;
}

export {add, divide, divrem, substract, multiply, power, _root};