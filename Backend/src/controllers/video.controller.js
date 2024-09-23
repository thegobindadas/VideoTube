import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";




export const publishAVideo = asyncHandler(async (req, res) => {

    const { title, description} = req.body
    
    if (!title || !description) {
        throw new ApiError(400, "Please provide  title and description")
    }
    

    let videoFileLocalPath;
    if (req.files && Array.isArray(req.files.videoFile) && req.files.videoFile.length > 0) {
        videoFileLocalPath = req.files?.videoFile[0]?.path;
    }else {
        throw new ApiError(400, "VideoFile file is required")
    }

    if (!videoFileLocalPath) {
        throw new ApiError(400, "VideoFile file is required")
    }
    

    let thumbnailLocalPath;
    if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    }else {
        throw new ApiError(400, "Thumbnail file is required")
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail file is required")
    }


    let publishVideoId = new mongoose.Types.ObjectId().toHexString()

    if (!publishVideoId) {
        throw new ApiError(500, "Something went wrong while generating video id")        
    }


    const fileStorePathOnCloudinary = `videohub/${req.user?._id}/${publishVideoId}`


    const videoFile = await uploadOnCloudinary(videoFileLocalPath, fileStorePathOnCloudinary)

    if (!videoFile) {
        throw new ApiError(500, "Something went wrong while uploading video file")
    }


    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath, fileStorePathOnCloudinary)

    if (!thumbnail) {
        throw new ApiError(500, "Something went wrong while uploading thumbnail")
    }


    const video = await Video.create({
        _id: publishVideoId,
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        duration: videoFile.duration,
        owner: req.user?._id
    })

    if (!video) {
        throw new ApiError(500, "Something went wrong while publishing video")
    }



    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            video,
            "Video published successfully"
        )
    ) 
})


export const getVideoById = asyncHandler(async (req, res) => {
    
    const { videoId } = req.params
    
    if (!videoId) {
        throw new ApiError(400, "Video id is required")
    }


    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video does not exist")
    }



    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            video,
            "Video fetched successfully"
        )
    )
})