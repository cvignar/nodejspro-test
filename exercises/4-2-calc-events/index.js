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

function main() {
	if (process.argv.length != 5) {
		console.log(usage);
		return ;
	}
	let firstNum = parseFloat(process.argv[2]);
	let secondNum = parseFloat(process.argv[3]);
	let command = process.argv[4];
	try {
		myEmitter.once('result', (result) => {
			console.log(`${firstNum} ${command} ${secondNum} = ${result}`);
			myEmitter.removeAllListeners();
		});
		// let iterator1 = actions.keys();
		for (const [key, value] of actions) {
			if (command == key) {
				myEmitter.emit(`${command}`, firstNum, secondNum);
				break ;
			}
		}
		if (actions.has(command))
			myEmitter.emit(command, (firstNum, secondNum));
		else
			console.log(usage);
	} catch (e) {
		console.error(e.message);
	}
}
main();
// console.log(myEmitter.eventNames());
// console.log(myEmitter);
