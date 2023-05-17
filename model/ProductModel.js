const mongoose = require('mongoose');
const ProductSchemaObject=require('./ProductSchema.json')

const ProductSchema=mongoose.Schema(ProductSchemaObject)
const ProductModel=mongoose.model("Model",ProductSchema,"products")

module.exports= ProductModel;