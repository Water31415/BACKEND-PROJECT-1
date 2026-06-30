import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"


dotenv.config({
    path : './env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT)
    console.log(`server is running at :${process.env.PORT}`);
})
.catch((error) =>{
    console.log(`db connection failed`,error);
})

/*(async()=>{

    try {
         await mongoose.connect(`${process.env.DATABASE_URL} /
            ${DB_NAME}`)

    }catch(error){
        console.error("ERROR; ",error)
        throw error
    }




})()*/