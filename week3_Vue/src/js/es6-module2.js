export let a=10;
export function b(){
	console.log('b function')
}
export const c=20;
export class Person{
	say(){
		console.log('say hi')
	}
}
let d = 'delete';
export {
	d
}

let sum = (a,b)=>{
	return a+b;
}
export {sum as total};