const add = require('./add.js');
const divrem = require('./divrem.js');
const divide = require('./divide.js');
const multiply = require('./multiply.js');
const power = require('./power.js');
const root = require('./root.js');
const substract = require('./substract.js');

const usage =	"Usage of my simple calculator: node index.js <num> <num> <command>\n" +
				"List of commands: add, substruct, multiply, divide, divrem, power, root\n" +
				"Example: node index.js 5 20 div";
function main() {
	if (process.argv.length != 5) {
		console.log(usage);
		return ;
	}
	let firstNum = parseFloat(process.argv[2]);
	let secondNum = parseFloat(process.argv[3]);
	let command = process.argv[4];
	try {
		switch (command) {
			case ("add" || "+"):
				console.log(`${firstNum} + ${secondNum} = ${add(firstNum, secondNum)}`);
				break ;
			case "substract":
				console.log(`${firstNum} - ${secondNum} = ${substract(firstNum, secondNum)}`);
				break ;
			case "multiply":
				console.log(`${firstNum} * ${secondNum} = ${multiply(firstNum, secondNum)}`);
				break ;
			case "divide":
				console.log(`${firstNum} / ${secondNum} = ${divide(firstNum, secondNum)}`);
				break ;
			case "divrem":
				console.log(`${firstNum} % ${secondNum} = ${divrem(firstNum, secondNum)}`);
				break ;
			case "power":
				console.log(`${firstNum}^${secondNum} = ${power(firstNum, secondNum)}`);
				break ;
			case "root":
				console.log(`${firstNum}^(1/${secondNum}) = ${root(firstNum, secondNum)}`);
				break ;
			default:
				console.log(usage);
		}
	} catch (e) {
		console.error(e.message);
	}
}

main();