import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js"
import { LikeDislike } from "../models/likeDislike.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";




export const getChannelStats = asyncHandler(async (req, res) => {
    try {
        const channelId = req.user._id;

        if (!isValidObjectId(channelId)) {
            throw new ApiError(400, "Invalid channel id");
        }

       
        const channel = await User.findById(channelId);

        if (!channel) {
            throw new ApiError(404, "Channel not found");
        }


        // Get the total number of videos uploaded by the channel
        const totalVideos = await Video.countDocuments({ owner: channelId });


        // Get the total number of subscribers
        const totalSubscribers = await Subscription.countDocuments({ channel: channelId });


        // Get the total video views for the channel
        const totalVideoViews = await Video.aggregate([
            {
                $match: { owner: new mongoose.Types.ObjectId(channelId) }
            },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: "$views" }
                }
            }
        ]);

        const totalViews = totalVideoViews.length > 0 ? totalVideoViews[0].totalViews : 0;


        // Get the total number of likes across all videos for the channel
        const totalLikes = await LikeDislike.countDocuments({
            video: { $in: await Video.find({ owner: channelId }).select("_id") }
        });


        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                {
                    totalVideos,
                    totalSubscribers,
                    totalViews,
                    totalLikes
                }, 
                "Channel stats fetched successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching channel stats");
    }
})


export const getChannelVideos = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params;
        const { page = 1, limit = 10 } = req.query;


        if (!isValidObjectId(channelId)) {
            throw new ApiError(400, "Invalid channel id");
        }

        
        const channel = await User.findById(channelId);

        if (!channel) {
            throw new ApiError(404, "Channel not found");
        }

        
        const videos = await Video.find({ owner: channelId })
            .sort({ createdAt: -1 }) // Sort by newest videos first
            .skip((page - 1) * limit) // Pagination: skip documents based on the page
            .limit(Number(limit)); // Limit the number of videos per page

            
        // Get the total number of videos for this channel
        const totalVideos = await Video.countDocuments({ owner: channelId });



        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                {
                    videos,
                    totalVideos,
                    totalPages: Math.ceil(totalVideos / limit),
                    currentPage: Number(page),
                },
                "Channel videos fetched successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching channel videos");
    }
})
