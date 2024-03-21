const express = require('express');
const userouter = require("./userroute");
const submissionroute = require('./submissionroute');
const rootrouter = express.Router();



rootrouter.use('/user', userouter)
rootrouter.use('/submission', submissionroute)

rootrouter.get('/' , (req , res)=>{
   res.send('this is main route')
})


module.exports = rootrouter;

