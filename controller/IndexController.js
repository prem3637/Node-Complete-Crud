const IndexController={
    index:function(req,res,next){
        res.send("Welcome to Node App");
    }
}

module.exports = IndexController;