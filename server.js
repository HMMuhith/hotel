import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import hotelRoute from './hotel.js'
import roomRoute from './room.js'
import userRoute from './user.js'
import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
import Hotel from './HotelModel.js'
import fs from 'fs'

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

// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin','http://localhost:5173')
//   res.setHeader('Access-Control-Allow-Headers','X-Requested-With, X-HTTP-Method-Override,Origin,Authorization,Content-Type, Accept')
//   res.setHeader('Access-Control-Allow-Credentials',true)
//   res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS')
//   next()
// })

const store=new MongoDBStore({
  uri:MONGO_URI,
  collection:'session', 
  expires:1000 * 60 * 60 * 24 * 30
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({secret:process.env.SESSION_SECRET_KEY,resave:false,saveUninitialized:false,store,cookie:{}}))

app.use('/booking',hotelRoute)


app.use('/user',userRoute)


app.use('/room',roomRoute)

// app.post('/upload',express.static(path.join(__dirname,'public')))

const loadAndStream = (filePath, mimeType, res) => {
  const fileStream = fs.createReadStream(filePath, "UTF-8")
  res.writeHead(200, {"Content-Type": mimeType});
  fileStream.pipe(res);
}

app.use((req,res)=>{
  if(req.url === '/'){
    const filePath = path.join(__dirname, 'index.html');
    loadAndStream(filePath, 'text/html', res)
}
if(req.url === '/styles/style.css'){
    const filePath = path.join(__dirname, 'styles', 'style.css');
    loadAndStream(filePath, 'text/css', res);
}
if(req.url === '/scripts/main.js'){
    const filePath = path.join(__dirname, 'scripts', 'main.js');
    loadAndStream(filePath, 'application/json', res)
}
})
  app.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'hotel','dist','index.html'))
  })

  app.use(express.static(path.join(__dirname,'hotel','dist')))

app.listen(process.env.PORT || 5000,()=>{
   console.log(`server running at ${process.env.PORT}`)
   
})
 
 