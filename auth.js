import User from "./ProfileModel.js"


const Auth= async(req,res,next)=>{
    // req?.session?.isLoggedin=true
    
  const user=await User.findById(req.session.user?.id)
  req.user=user
  req.user.id=user?._id
// console.log(req.user.id)
 
  if(!req.user.isAdmin){
        return next()
  }
  return res.status(404).json({error:`Unauthorized`})
    
}


const Admin=(req,res,next)=>{
    const user=User.findById(req.session.user._id)
    req.user=user
    if(req.user.isAdmin){
        return next()
    }
    return res.status(404).json({error:`admin authorization required`})
}
export {Auth,Admin}