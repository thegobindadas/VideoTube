import config from "../config/index.js";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"




const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token") 
    }
}




export const registerUser = asyncHandler(async (req, res) => {
    
    const { username, email, fullName, password } = req.body
    

    if ([username, email, fullName, password].some(field => field?.trim() === "" || field?.trim() === undefined)) {
        throw new ApiError(400, "All fields are required")
    }


    const existingUser = await User.findOne({ 
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files?.avatar[0]?.path;
    }else {
        throw new ApiError(400, "Avatar file is required")
    }
    
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed")
    }


    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }



    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})


export const loginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required")
    }

    // if (!(username || email)) {
    //     throw new ApiError(400, "Username or email is required") 
    //}


    const user = await User.findOne({ 
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exists")
    }


    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while logging in the user")
    }


    const options = {
        httpOnly: true,
        secure: true
    }


    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            }, 
            "User logged in successfully"
        )
    )
})


export const logoutUser = asyncHandler(async (req, res) => {   

    const logoutUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    if (!logoutUser) {
        throw new ApiError(500, "Something went wrong while logging out the user")
    }


    const options = {
        httpOnly: true,
        secure: true
    }

    
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200, 
            {}, 
            "User logged out successfully"
        )
    )
})


export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {

        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized request")
        }


        const decodedToken = jwt.verify(incomingRefreshToken, config.REFRESH_TOKEN_SECRET)

        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized request")
        }


        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }


        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }


        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
     

        const options = {
            httpOnly: true,
            secure: true
        }



        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {
                    accessToken,
                    refreshToken: refreshToken
                }, 
                "Access token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while refreshing access token")
    }
})


export const changeCurrentPassword = asyncHandler(async (req, res) => {

    const { currentPassword, newPassword, confirmNewPassword } = req.body

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        throw new ApiError(400, "All fields are required")
    }

    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, "New password and confirm new password do not match")
    }


    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }


    const isPasswordValid = await user.isPasswordCorrect(currentPassword)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid current password")
    }


    user.password = newPassword
    await user.save({ validateBeforeSave: false })


    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {}, 
            "Password changed successfully"
        )
    )
})


export const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {user: req.user}, 
            "User fetched successfully"
        )
    )
})


export const updateAccountDetails = asyncHandler(async (req, res) => {

    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }


    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(404, "User not found")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user, 
            "Account details updated successfully"
        )
    )
})


export const updateUserAvatar = asyncHandler(async (req, res) => {

    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //TODO: delete old image - assignment


    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar) {
        throw new ApiError(500, "Something went wrong while uploading avatar")
    }


    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(404, "User not found")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user, 
            "Avatar updated successfully"
        )
    )
})