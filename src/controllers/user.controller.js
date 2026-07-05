import {asyncHandler} from "../utils/asyncHandler.js"
import {apierror} from "../utils/apierror.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apirespnse } from "../utils/apiresponse.js"
import jwt from "jsonwebtoken"


const generateRefresshAndAccessTokens = async (userId) => {
        try {
            const user = await User.findById(userId)
            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()
            user.refreshToken = refreshToken
            await user.save({ validateBeforeSave : false})
            return {accessToken :accessToken , refreshToken :refreshToken}

        } catch (error)
         {  console.error(error);
         
            throw new apierror (500 , "SOMETHING WENT WRONG WHILE GENERATING ACCESS AND REFRESH TOKENS")
        }
        
    }
const registerUser = asyncHandler( async (req,res) => {
    
    const {Fullname , email , username , password} = req.body
    
    if (
        [Fullname,email,username,password].some((field)=> field?.trim()==="")
    ) {
        throw new apierror(400,"ALL FIELDS ARE REQUIRED")        
    }
    const existeduser = await User.findOne({
        $or: [{username : username},{email : email}]
    })

    if (existeduser) {
        throw new apierror(409,"USER ALREADY EXISTS") 
    }
     const avatarLocalPath = req.files?.avatar[0]?.path;

     const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
     
     if (!avatarLocalPath) {
        throw new apierror(400,"AVATAR FILE IS REQUIRED") 
     }
     const avatar = await uploadOnCloudinary(avatarLocalPath)
     if (!avatar) {
        throw new apierror(409,"AVATAR REQUIRED")
     }
     let coverImage;

    if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    
     const user = await User.create({
            Fullname : Fullname ,
            avatar : avatar.secure_url,
            coverImage : coverImage?.secure_url || "",
            email : email,
            password : password ,
            username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")


    if (!createdUser) {
            throw new apierror(500 , "SOMETHING WENT WRONG ON REGISTRING USER")
     }

     return res.status(201).json(
        new apirespnse(200, createdUser,"USER REGISTERED ")
     )

})


const loginUser = asyncHandler(async (req,res) => {
    
    const{email,password}= req.body
    
    if (!email) {
        throw new apierror (400,"ENTER USERNAME OR EMAIL")        
    }    
    const user = await User.findOne({
        $or :[{email :email}] 
    })
    if (!user) {
        throw new apierror(404,"USER NOT FOUND")
        
    }
    const isPasswordValid= await user.isPasswordcorrect(password)
    
    if (!isPasswordValid) {
        throw new apierror(404,"PASSWORD NOT CORRECT")
        
    }
    const {accessToken,refreshToken} = await generateRefresshAndAccessTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken") 
    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options)
    .json(
        new apirespnse(
            200,
            {
                user : loggedInUser,accessToken,refreshToken 
            },
            "user logged in successfully"
        )

    )
        
})
const logoutUser =asyncHandler(async (req,res) => {
    
    await User.findByIdAndUpdate(
        req.user._id,{ 
            $set :{refreshToken:undefined}
            
    })
    const options = {
        httpOnly : true,
        secure : true
    }
    return res.status(200)
    .clearCookie("accessToken",options )
    .clearCookie("refreshToken",options )
    .json(new apirespnse(200,{},"USER LOGOUT SUCCESSFULLY"))
})
const refreshAccessToken = asyncHandler(async (req,res) => {
    try {
    
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if (!incomingRefreshToken) {
            throw new apierror(401,"UNAUTHORIZED REQUEST")
            }
        
    
        const decodedToken= jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
           const user = await User.findById(decodedToken?.id)
    
           if(!user){
            throw new apierror(401,"invalid refresh token")
           }
           if (incomingRefreshToken !== user?.refreshToken) {
            throw new apierror(401,"TOKEN EXPIRED OR USED")
           }
           const options ={
            httpOnly : true,
            secure : true
           }
           const{accessToken,newrefreshToken}=await generateRefresshAndAccessTokens(user._id)
    
           return res
           .status(200)
           .cookie("accessToken",accessToken,options)
           .cookie("refreshToken",newrefreshToken,options)
           .json(
            new apirespnse(
                200,
                {accessToken,newrefreshToken}
            )
           )}
        
 catch (error) {
    console.error(error);
    
    throw new apierror(401,error?.message)
}})
export { loginUser
    ,logoutUser,refreshAccessToken
}

export {registerUser}