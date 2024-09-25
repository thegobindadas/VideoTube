import mongoose, { isValidObjectId } from "mongoose"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"




export const createTweet = asyncHandler(async (req, res) => {

    const { content } = req.body

    if (!content) {
        throw new ApiError(400, "Content is required")        
    }


    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    })

    if (!tweet) {
        throw new ApiError(500, "Something went wrong while creating tweet")   
    }


    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            tweet,
            "Tweet created successfully"
        )
    )
})


export const getUserTweets = asyncHandler(async (req, res) => {
    try {

        const { userId } = req.params

        if (!userId) {
            throw new ApiError(400, "User id is required")
        }


        const tweets = await Tweet.find({ owner: userId })

        if (!tweets) {
            throw new ApiError(404, "Tweets not found")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweets,
                "Tweets fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching tweets")
    }
})


export const updateTweet = asyncHandler(async (req, res) => {
    try {
        
        const { tweetId } = req.params
        const { content } = req.body


        if (!tweetId) {
            throw new ApiError(400, "Tweet id is required")
        }


        if (!isValidObjectId(tweetId)) {
            throw new ApiError(400, "Invalid tweet id")
        }


        const tweet = await Tweet.findById(tweetId)

        if (!tweet) {
            throw new ApiError(404, "Tweet not found")
        }


        if (tweet.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Unauthorized to update this tweet")
        }


        if(content) {
            tweet.content = content
        }

        const updatedTweet = await tweet.save({ validateBeforeSave: false })

        if (!updatedTweet) {
            throw new ApiError(500, "Something went wrong while updating tweet")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedTweet,
                "Tweet updated successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while updating tweet")
    }
})


export const deleteTweet = asyncHandler(async (req, res) => {
    try {

        const { tweetId } = req.params

        if (!tweetId) {
            throw new ApiError(400, "Tweet id is required")
        }


        if (!isValidObjectId(tweetId)) {
            throw new ApiError(400, "Invalid tweet id")
        }


        const tweet = await Tweet.findById(tweetId)

        if (!tweet) {
            throw new ApiError(404, "Tweet not found")
        }


        if (tweet.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Unauthorized to delete this tweet")
        }


        const deteteTweet = await tweet.deleteOne()


        if (!deteteTweet) {
            throw new ApiError(500, "Something went wrong while deleting tweet")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Tweet deleted successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while deleting tweet")
    }
})