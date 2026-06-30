import mongoose , {Schema}from "mongoose";
import JsonWebTokenError from "jsonwebtoken/lib/JsonWebTokenError";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique: true,
        trim : true,
        index : true
    },
    email :{
        type : String,
        required : true,
        unique: true,
        trim : true,
    },
    Fullname:{
        type : String,
        required : true,
        trim : true,
    },
    avatar :{
        type: String,
        required : true,

    },
    coverImage :{
        type: String,

    },
    watchHistory :[
     {
            type : Schema.Types.ObjectId,
            ref: "video"
     }
    ],
    password:{
        type : String,
        required: [true,`password is required`]

    },
    refreshToken :{
        type : String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")) return next();
        this.password=bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordcorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.method.generateAccessToken = function(){

    return JsonWebTokenError.sign(
        {
            id: this.id,
            email:this.email,
            username : this.username,
            Fullname : this.Fullname                
            },
            process.env.access_token_secret,{
                    expiresIn : process.env.access_token_expiry
            } 
        )
}
    


userSchema.method.generateRefreshToken = function(){

    return JsonWebTokenError.sign(
        {
            id: this.id,
            email:this.email,
            username : this.username,
            Fullname : this.Fullname                
            },
            process.env.refresh_token_secret,{
                    expiresIn : process.env.refresh_token_expiry
            } 
        )
}



export const User = mongoose.model("User",userSchema)