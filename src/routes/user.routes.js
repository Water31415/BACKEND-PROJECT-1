import { Router } from "express";
import { logoutUser, loginUser, registerUser,refreshAccessToken } from "../controllers/user.controller.js";
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
 


export default router