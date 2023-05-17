require('dotenv').config();
//console.log("process.env.PORT");

//const {console}=require('console')
const http=require('http');
const app=require("./app");
const mongoose=require('mongoose')
const config=require('./config/config.json')


const server=http.createServer(app);
const PORT=process.env.PORT ||5000;
const DBConnection=process.env.CONNECTION || config.database.mongodb.atlas

server.listen(PORT,()=>{
    console.log("server started at port :"+PORT);
    mongoose.connect(DBConnection,{
        useNewUrlParser:true,
        useUnifiedTopology:true

    }).then(()=>{
        console.log('Connection Created')

    }).catch((error)=>{
console.log('Error in Connecting with DB'+error)
})
});