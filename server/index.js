const express=require('express');
const dotenv=require('dotenv').config();
const cors=require('cors');
const app=express();
const {mongoose}=require('mongoose')
const port=8000;
const cookieParser=require('cookie-parser')
// database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to the database"))
.catch((err)=>console.log("database not connected",err))

//middleware
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/',require('./routes/authRoutes'))

app.listen(port,()=>

    console.log(`server is running on ${port}`)
);
