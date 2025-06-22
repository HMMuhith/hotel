import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import hotelRoute from './hotel.js'
import userRoute from './user.js'
import session from 'express-session'  
import ConnectMongoDBSession from 'connect-mongodb-session'
import bookingRoute from './booking.js'


dotenv.config() 
const MONGO_URI=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.k4lgw6j.mongodb.net/${process.env.MONGODB_DB_NAME}`; 

const connection=async()=>{
  try{
    await mongoose.connect(MONGO_URI)
  console.log(`MongoDB connected`)
}
catch{
    console.log(`Not connected`)

}
}
connection()
const __dirname=path.resolve()
const MongoDBStore=ConnectMongoDBSession(session)
const app=express()

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','https://hotel-delta-weld.vercel.app')
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With, X-HTTP-Method-Override,Origin,Authorization,Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Credentials',true)
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS')
  next()
})

const store=new MongoDBStore({
  uri:MONGO_URI,
  collection:'session', 
  expires:1000 * 60 * 60 * 24 * 30
})
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 

// app.use(session(
//   {
//     secret:process.env.SESSION_SECRET_KEY,
//     resave:false,
//     saveUninitialized:false,  
//     store,
//     cookie:{
//       sameSite:'lax',
//       secure:false,
//       httpOnly:true ,
//       maxAge:1000 * 60 * 60 * 24
//     },
  
// }
// ))

// cookie authentication halted due to browsers cookie setup issue. Setting up only front page cookie disappers after next page.

app.use('/hotel',hotelRoute)


app.use('/user',userRoute)

app.use('/booking',bookingRoute)


app.use(express.static(path.join(__dirname,'public')))
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'hotel','dist')))

  app.get('/{*splat}',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'hotel','dist','index.html'))
   
  })
}
  


app.listen(process.env.PORT || 5000,()=>{
   console.log(`server running at ${process.env.PORT}`)
    
})
     
 // new comment added
