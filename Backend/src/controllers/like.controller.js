import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"



export const toggleVideoLike = asyncHandler(async (req, res) => {
    try {
        const { videoId } = req.params

        if (!videoId) {
            throw new ApiError(400, "Video id is required")
        }


        if (!isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid video id")
        }



        const like = await Like.findOne({
            video: videoId,
            likedBy: req.user?._id
        })


        if (like) {
            const deleteLike = await like.deleteOne()

            if (!deleteLike) {
                throw new ApiError(500, "Something went wrong while removing like from video")
            }


            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Like removed successfully"
                )
            )
        }else {

            const newLike = await Like.create({
                video: videoId,
                likedBy: req.user?._id
            })

            if (!newLike) {
                throw new ApiError(500, "Something went wrong while like on video")
            }


            return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    newLike,
                    "Like added successfully"
                )
            )
        }
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while toggling like on video")
    }
    
})


export const toggleCommentLike = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params

        if(!commentId) {
            throw new ApiError(400, "Comment id is required")
        }


        if (!isValidObjectId(commentId)) {
            throw new ApiError(400, "Invalid comment id")
        }


        const like = await Like.findOne({
            comment: commentId,
            likedBy: req.user?._id
        })


        if (like) {
            const deleteLike = await like.deleteOne()

            if (!deleteLike) {
                throw new ApiError(500, "Something went wrong while removing like from comment")
            }


            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Like removed successfully"
                )
            )
        }else {
            const newLike = await Like.create({
                comment: commentId,
                likedBy: req.user?._id
            })

            if (!newLike) {
                throw new ApiError(500, "Something went wrong while like on comment")
            }


            return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    newLike,
                    "Like added successfully"
                )
            )
        }
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while toggling like on comment")
    }

})


export const toggleTweetLike = asyncHandler(async (req, res) => {
    try {
        const { tweetId } = req.params

        if (!tweetId) {
            throw new ApiError(400, "Tweet id is required")
        }


        if (!isValidObjectId(tweetId)) {
            throw new ApiError(400, "Invalid tweet id")
        }


        const like = await Like.findOne({
            tweet: tweetId,
            likedBy: req.user?._id
        })


        if(like) {
            const deleteLike = await like.deleteOne()

            if (!deleteLike) {
                throw new ApiError(500, "Something went wrong while removing like from tweet")
            }


            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Like removed successfully"
                )
            )
        }else {

            const newLike = await Like.create({
                tweet: tweetId,
                likedBy: req.user?._id
            })

            if (!newLike) {
                throw new ApiError(500, "Something went wrong while like on tweet")
            }


            return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    newLike,
                    "Like added successfully"
                )
            )
        }
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while toggling like on tweet")
    }
})


export const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

    const getAllLikedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "liked_videos",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            thumbnail: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$liked_videos"
        },
        {
            $replaceRoot: {
                newRoot: "$liked_videos"
            }
        }
    ])
    


    if (!getAllLikedVideos) {
        throw new ApiError(500, "Something went wrong while fetching liked videos")
    }
 


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            getAllLikedVideos[0].liked_videos,
            "Liked videos fetched successfully"
        )
    )
})