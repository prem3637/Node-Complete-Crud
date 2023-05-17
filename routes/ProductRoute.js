const express=require("express");
const multer=require("multer");
//************All controller Start**********/
const ProductController=require("../controller/ProductController")

const router=express.Router();

const upload=multer({dest:"public/upload"})

router.get('/upload',ProductController.uploadingSingleImageForm)
router.post('/upload',upload.single('pic'),ProductController.uploadFile);
router.get('/',ProductController.getproducts);
router.post('/search',ProductController.getSearch)
router.get('/:id',ProductController.getSingleProduct);

router.post('/create',ProductController.createProducts);
router.delete('/:id',ProductController.deleteSingleProduct);
router.put('/:id',ProductController.updateProduct);

module.exports=router;


