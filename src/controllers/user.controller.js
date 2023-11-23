import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { User } from "../models/user.models.js";
import {fileUpload} from "../utils/couldinry.js";
import { ApiResponse } from "../utils/APIresponse.js";

const registerUser = asyncHandler (async (req,res)=>{
    // get user deatil from frontend
       const {userName,fullname,email,password} = req.body;
       console.log("email:",email);


    // check valiadtion for empty fields

    if (
        [userName,fullname,email,password].some((fields)=> (fields?.trim()===""))

    ) {
        throw new ApiError(400,"All fields are required")
        
    }
    // check user or email exist or not

    const userExisted = User.findOne({
        $or:[{userName},{email}]
    })

    if (userExisted) {
        throw new ApiError(409, 'User already exists')
    }

    // check images

    const avatarLocalPath = req.files?.avatar[0].path;

    const coverImageLocalPath = req.files?.coverImage[0].path;

    // checkImage are uploaded or not

    if (!avatarLocalPath) {
        new ApiError(400, "avatar files is not uploaded")
    }

    // ulpoad oncloudinary
    const avatar = await fileUpload(avatarLocalPath)
    const coverImage = await fileUpload(coverImageLocalPath)

    // check avatar file is uploaded

    if(!avatar){
        throw new ApiError(400,"Upload avatar file failed")
    }

    // connect to db

   const user =  await User.create({
        userName: userName.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url  || "",
    })

    // check if user is created
    const createdUser = await User.findOne(user._id).select("-password -refreshToken")
    
    // check if user is already created

    if(!createdUser){
    throw new ApiError(500, "Something went wrong")
}
// return response

    return res.status(201).json(
        new ApiResponse(200,"User register successfully")
    )

})
export  {registerUser}