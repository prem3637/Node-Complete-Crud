const express=require("express");
//************All controller Start**********/
const IndexController=require("../controller/IndexController")

const router=express.Router();

router.get('/',IndexController.index)

module.exports=router;