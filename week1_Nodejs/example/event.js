const events = require('events');

let myevent = new events.EventEmitter();

myevent.on('go',()=>{
    console.log('show go');
});

myevent.on('connection',()=>{
    console.log('connect success');

    myevent.emit('go');
});

myevent.emit('connection');