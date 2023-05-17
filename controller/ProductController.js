const { ObjectId } = require('mongoose');
const ProductModel=require('../model/ProductModel')
const path=require('path');
const fs=require('fs');
const ProductController={
    getproducts:function(req,res,next){

        

        ProductModel.find({},(error,data)=>{
            console.log(data)
            if(error==null){
                if(typeof(data)=='object'){
                    if(Array.isArray(data)){
                       // console.log(data)
                    
                    if(data.length > 0){
                        res.status(200).json({
                            code:"201",
                            message:"Products Found Successfully",
                            status:true,
                            data:data,
                            error:false
                        });
                    }
                }
                else{
                        res.status(404).json({
                            code:"404",
                            message:"No record found",
                            status:false,
                            data:[],
                            error:false
                        });
                    }
                }
            }
        })

        
    },
    createProducts:function(req,res,next){
       //console.log(req.body);  body-parse package
       ProductModelObject=new ProductModel(req.body);
       ProductModelObject.save((error,data)=>{
        if(error==null){
            res.status(200).json({
                code:"201",
                message:"Record inserted Successfully",
                status:true,
                data:data,
                error:false

            })
        }else{
            res.status(404).json({
                code:"404",
                message:"No record Found",
                status:false,
                data:[],
                error:false

            })
        }
       })


    },
    //get single products
    getSingleProduct:function(req,res,next){
        let _id=req.params.id;
       // console.log("id ="+_id);
       ProductModel.findOne({_id:ObjectId},(error,data)=>{
        if(error==null){
            if(typeof(data)=='object'){
                if(Array.isArray(data)){
                    //console.log("data is Array of Object")
                }else{
                    if(data==null){
                        res.status(404).json({
                        code:"404",
                        message:"No Record Found for Id"+ObjectId,
                        data:[],
                        status:false,
                        error:false,
                    });

                    }else{
                        res.status(200).json({
                            code:"201",
                            message:"record found",
                            data:data,
                            status:false,
                            error:false,
                        });
                        

                    }
                }

            }else{
                console.log("Not a Valid Object")
            }
        }else{
                console.log("Exception Occured")
            }
        
       })
    },
    deleteSingleProduct:function(req,res,next){
        let ObjectId=req.params.id;
        ProductModel.deleteOne({_id:ObjectId},(error,data)=>{
            if(error==null){
                res.status(200).json({
                    code:"201",
                    message:"delete successfully",
                    data:[],
                    status:false,
                    error:false,
                });
                

            }else{
                res.status(404).json({
                    code:"404",
                    message:"can't delete Record",
                    data:[],
                    status:false,
                    error:false,
                });

            }
        })
    },
    updateProduct:function(req,res,next){
        let ObjectId=req.params.id;
        ProductModel.findOne({_id:ObjectId},(error,data)=>{
            if(error==null){
                //Add validation Code for Object and array
                console.log(data)
                data.name=req.body.name
                data.brand=req.body.brand
                data.price=req.body.price

                data.save((err)=>{
                    if(err==null){
                        res.status(200).json({
                            code:"201",
                            message:"Record updated Successfully",
                            status:true,
                            data:data,
                            error:false,
                        });

                    }else{
                        res.status(404).json({
                            code:"404",
                            message:"Cannot update Record",
                            data:[],
                            status:false,
                            error:false,
                        });

                    }
                });
            }else{

            }
        });

    },

    //upload method form
    uploadingSingleImageForm:function(req,res,next){
        let indexPage=path.join(__dirname,'../pages/index.html')
        fs.readFile(indexPage,"utf-8",(error,data)=>{
            if(error==null){
                res.send(data);
            }
        })
    },
    uploadFile:function(req,res,next){
        //console.log(req.file);
        if(req.file){
            let ext=req.file.originalname.split(".")[1];
            let targetFileName=req.file.filename+"."+ext;
            fs.rename(req.file.path,`${req.file.destination}/${targetFileName}`,(error)=>{
                res.send('File Uploaded successfully and Renamed');
            })
        }
    },
    getSearch:function(req,res,next){
        let searchArrayOfObject=[];
        for(itemKey in req.body){
            if(itemKey !='sort'){
                searchArrayOfObject.push({[""+itemKey+""]:req.body[item]});
            }
        }
        //console.log('Array of Object = ',searchArrayOfObject);
        ProductModel.find({$and:searchArrayOfObject},(error,data)=>{
            if(error==null){
                if(data.lemgth>0){
                    res.status(200).json({
                        code:"201",
                        message:"Record found successfully",
                        status:"true",
                        data:data,
                        error:false,
                    });
                }
            }
        })

        
    }
}

module.exports=ProductController;
