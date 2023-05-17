const express=require("express");
const IndexRoute=require("./routes/IndexRoute");
const ProductRoute=require("./routes/ProductRoute")
const bodyParser=require('body-parser')
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',IndexRoute);
app.use('/products',ProductRoute);
app.use('/products/uploads',ProductRoute);


module.exports= app;