import { asyncHandler } from "../utils/asyncHandler";
import { Video } from "../models/video.model";
import { Mongoose } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";




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


    let publishVideoId = new Mongoose.Types.ObjectId().toHexString()

    if (!publishVideoId) {
        throw new ApiError(500, "Something went wrong while generating video id")        
    }


    const fileStorePathOnCloudinary = `videohub/${req.user?._id}/${publishVideoId}`


    const videoFile = await uploadOnCloudinary(videoFileLocalPath, fileStorePathOnCloudinary)
    console.log(videoFile);
    

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