// let username = 'laoxie';
import username from './es6-module.js';
import {me} from './es6-module.js';
import {res as result} from './es6-module.js';
import * as all from './es6-module.js';

let show = name=>{
	console.log(`hello ${name}`);
}


// show(name);
console.log(all)
console.log(username);
console.log(result);
me();