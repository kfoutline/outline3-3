const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.end('path:/')
})

app.listen(3006,()=>{
    console.log("start 3006")
})