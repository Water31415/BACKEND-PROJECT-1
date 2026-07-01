import {asyncHandler} from "../utils/asyncHandler.js"
import {apierror} from "../utils/apierror.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apirespnse } from "../utils/apiresponse.js"

const registerUser = asyncHandler( async (req,res) => {
    
    const {Fullname, email , username , password} = req.body
    
    if (
        [Fullname,email,username,password].some((field)=> field?.trim()==="")
    ) {
        throw new apierror(400,"ALL FIELDS ARE REQUIRED")        
    }
    const existeduser = await User.findOne({
        $or: [{username},{email}]
    })

    if (existeduser) {
        throw new apierror(409,"USER ALREADY EXISTS") 
    }
     const avatarLocalPath = req.files?.avatar[0]?.path;
     
     if (!avatarLocalPath) {
        throw new apierror(400,"AVATAR FILE IS REQUIRED") 
     }
     const avatar = await uploadOnCloudinary(avatarLocalPath)
     if (!avatar) {
        throw new apierror(409,"AVATAR REQUIRED")
     }
    const user = await User.create({
        Fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
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
    res.status(100).json({
        message : "ok"
    })
    
})

export { loginUser}

export {registerUser}