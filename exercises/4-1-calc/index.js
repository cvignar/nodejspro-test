const usage =	"Usage of my simple calculator: node index.js <num> <num> <command>\n" +
				"List of commands: add, substruct, mult, div, divrem, power, root\n" +
				"Example: node index.js 5 20 div";

const actions =	new Map([
	["add", add = require('./add.js')],
	["substract", substract = require('./substract.js')],
	["mult", multiply = require('./multiply.js')],
	["div", divide = require('./divide.js')],
	["divrem", divrem = require('./divrem.js')],
	["pow", power = require('./power.js')],
	["root", _root = require('./root.js')]]);

function main() {
	if (process.argv.length != 5) {
		console.log(usage);
		return ;
	}
	let firstNum = parseFloat(process.argv[2]);
	let secondNum = parseFloat(process.argv[3]);
	let command = process.argv[4];
	try {
		if (actions.has(command))
			console.log(`${firstNum} ${command} ${secondNum} = ${actions.get(command)(firstNum, secondNum)}`);
		else
			console.log(usage);
	} catch (e) {
		console.error(e.message);
	}
}

main();