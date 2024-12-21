require('dotenv').config()

const express = require('express')
const cors = require('cors')


//create server
const fsServer = express()

//to connect with frontend
fsServer.use(cors())

//import router
const router = require('./routes')

//import mongoDB connection files
require('./connection')




//parse json format
fsServer.use(express.json())

//use router
fsServer.use(router)


fsServer.use('/uploads',express.static('./uploads'))

//port
const PORT = 4000 || process.env.PORT

//listen
fsServer.listen(PORT,()=>{
    console.log(`Server running successfully at port number ${PORT}`);
    
})

