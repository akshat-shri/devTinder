const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthorized = token ==="xyz";
    if(!isAuthorized){
        res.status(401).send("unauthorized");
    }
    else{
    next();
    }
};

const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthorized = token ==="yz";
    if(!isAuthorized){
        res.status(401).send("unauthorized");
    }
    else{
    next();
    }
};

module.exports = {
     adminAuth,
     userAuth
}