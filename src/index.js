import { app } from "./app.js";
import connectDB from "./db/index.js";
import { configDotenv } from "dotenv";


configDotenv({
    path : "./env" 
})


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("application unable to connect with db : ", error);
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("Mongodb Connection Error : ", error);
})




/*
import express from "express"
const app = express();

( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("application unable to connect with db : ", error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening to port : ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("Error : ", error)
        throw error
    }
})()
*/