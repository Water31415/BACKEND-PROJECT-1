import { Router } from "express";
import { loginUser
    ,logoutUser
    ,refreshAccessToken
    ,changeCurrentPassword
    ,currentUser
    ,updateAccountDetails
    ,registerUser
    ,updateAvatarImage,
    getUserChannelProfile,
    getWatchHistory} from "../controllers/user.controller.js";
import {uploadImageOnMulter} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/user.auth.js";

const router = Router()

router.route("/register").post(
    uploadImageOnMulter.fields([
        {
            name : "avatar",
            maxCount :1
        },
        {
            name : "coverImage",
            maxCount: 1
        }

    ]),
    
    registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshToken").post(refreshAccessToken)
router.route("/changeCurrentPassword").post(verifyJWT,changeCurrentPassword)
router.route("/currentUser").get(verifyJWT,currentUser)
router.route("/updateAccountDetails").patch(verifyJWT,updateAccountDetails)
router.route('/updateAvatarImage').patch(verifyJWT,uploadImageOnMulter.single("avatar"),updateAvatarImage)
 
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getWatchHistory)

export default router