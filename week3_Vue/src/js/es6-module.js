// let myname = 'laoxie';

let person = {
	name:'laoxie',
	age:18
}

function show(){
	console.log(123)
}

export  let username = 'lemon';
export  let res = 'res';
export {person as p,person}
export default show;
export  function me(){console.log('函数中的this:',this)}

// 作为中间件
export * from './es6-module2.js';