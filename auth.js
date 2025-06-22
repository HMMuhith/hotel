import User from "./ProfileModel.js"
import jwt from 'jsonwebtoken'

const Auth= async(req,res,next)=>{
 
//   const user=await User.findById(req.session.user._id)
//   req.user=user
//   req.user.id=user._id 
//   req.user.isAdmin=user.isAdmin
// console.log(`session reading`,req.session)
 
//   if(!req.user.isAdmin){
//         return next() 
//   }
//   return res.status(404).json({error:`Unauthorized`})
try {
  const token=req.headers.authorization.split(' ')[1]
 const decodedinfo= jwt.verify(token,process.env.JWT_SECRET_KEY)
 req.user={id:decodedinfo.id,name:decodedinfo.name,email:decodedinfo.email,isAdmin:decodedinfo.isAdmin}

  if(!req.user.isAdmin){
return next()
  }
  return res.status(200).json({error:`unauthorized`})
} catch (error) {
  res.status(400).json(error)
}
       
}


const Admin=(req,res,next)=>{
    // const user=User.findById(req.session.user._id)
    // req.user=user
    // if(req.user.isAdmin){
    //     return next()
    // }
    // return res.status(404).json({error:`admin authorization required`})

    const token=req.headers.authorization.split(' ')[1]
try {
 const decodedinfo= jwt.verify(token,process.env.JWT_SECRET_KEY)
 req.user={id:decodedinfo.id,name:decodedinfo.name,email:decodedinfo.email,isAdmin:decodedinfo.isAdmin}
  if(req.user.isAdmin){
return next()
  }
  return res.status(200).json({error:`admin authorization required`})
} catch (error) {
  res.status(400).json(error)
}
}
export {Auth,Admin}