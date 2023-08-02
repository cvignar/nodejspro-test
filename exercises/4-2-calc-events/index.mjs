import * as actions from './actions.mjs'
import {EventEmitter} from 'events';

const usage =	"Usage of my simple calculator: node index.js <num> <num> <command>\n" +
				"List of commands: add, substruct, mult, div, divrem, pow, root\n" +
				"Example: node index.js 5 20 div";

function main(actionsMap) {
	if (process.argv.length != 5) {
		throw new Error(usage);
	}
	const firstNum = parseFloat(process.argv[2]);
	const secondNum = parseFloat(process.argv[3]);
	const command = process.argv[4];
	try {
		if (actionsMap.has(command)) {
			myEmitter.emit(command, (firstNum, secondNum));
		} else {
			throw new Error(usage);
		}
	} catch (e) {
		console.error(e.message);
	}
}

const actionsMap =	new Map([
	["add", actions.add],
	["substract", actions.substract],
	["mult", actions.multiply],
	["div", actions.divide],
	["divrem", actions.divrem],
	["pow", actions.power],
	["root", actions._root]
]);

const myEmitter = new EventEmitter();
for (const [key, value] of actionsMap) {
	myEmitter.once(key, (firstNum, secondNum) => {
		myEmitter.emit('result', value(firstNum, secondNum));
	});
}

myEmitter.once('result', (result) => {
	console.log(`${firstNum} ${command} ${secondNum} = ${result}`);
	myEmitter.removeAllListeners();
});

main(actionsMap);
