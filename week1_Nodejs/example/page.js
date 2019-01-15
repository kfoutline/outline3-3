//page.js
    
//得到一个对象，包含暴露的setName,setAge方法
let person = require('./person.js');
console.log(person.setName());


// 既然是得到对象，也可以直接解构
let {setName,setAge} = require('./person.js');

console.log(setName(),setAge());