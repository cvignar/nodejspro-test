const EventEmitter = require('events');

const usage =	"Usage of my simple calculator: node index.js <num> <num> <command>\n" +
				"List of commands: add, substruct, mult, div, divrem, pow, root\n" +
				"Example: node index.js 5 20 div";

const actions =	new Map([
	["add", add = require('./add.js')],
	["substract", substract = require('./substract.js')],
	["mult", multiply = require('./multiply.js')],
	["div", divide = require('./divide.js')],
	["divrem", divrem = require('./divrem.js')],
	["pow", power = require('./power.js')],
	["root", _root = require('./root.js')]]);

const myEmitter = new EventEmitter();
for (const [key, value] of actions) {
	myEmitter.once(key, (firstNum, secondNum) => {
		myEmitter.emit('result', value(firstNum, secondNum));
	});
}

myEmitter.once('result', (result) => {
	console.log(`${firstNum} ${command} ${secondNum} = ${result}`);
	myEmitter.removeAllListeners();
});

function main() {
	if (process.argv.length != 5) {
		console.log(usage);
		return ;
	}
	const firstNum = parseFloat(process.argv[2]);
	const secondNum = parseFloat(process.argv[3]);
	const command = process.argv[4];
	try {
		if (actions.has(command)) {
			myEmitter.emit(command, (firstNum, secondNum));
		} else {
			console.log(usage);
		}
	} catch (e) {
		console.error(e.message);
	}
}
main();
