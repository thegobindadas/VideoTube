import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"




export const isSubscribed = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params;

        if (!channelId) {
            throw new ApiError(400, "Channel id is required");
        }

        if (!isValidObjectId(channelId)) {
            throw new ApiError(400, "Invalid channel id");
        }


        // Check if the user is subscribed to the channel
        const subscription = await Subscription.findOne({
            channel: channelId,
            subscriber: req.user?._id
        });



        // Respond with true or false based on the subscription status
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { isSubscribed: !!subscription }, // Convert to boolean
                    "Subscription status retrieved successfully"
                )
            );
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while checking subscription status");
    }
});


export const toggleSubscription = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params;

        if (!channelId) {
            throw new ApiError(400, "Channel id is required");
        }

        if (!isValidObjectId(channelId)) {
            throw new ApiError(400, "Invalid channel id");
        }


        // Check if the subscription already exists
        const existingSubscription = await Subscription.findOne({
            channel: channelId,
            subscriber: req.user?._id
        });

        if (existingSubscription) {
            // Unsubscribe if already subscribed
            const deleteSubscription = await Subscription.deleteOne({
                _id: existingSubscription._id // Ensure you're deleting the correct subscription
            });

            if (!deleteSubscription) {
                throw new ApiError(500, "Something went wrong while unsubscribing");
            }

            return res.status(200).json(
                new ApiResponse(
                    200,
                    {isSubscribed: false},
                    "Subscription unsubscribed successfully"
                )
            );
        } else {
            // Subscribe if not already subscribed
            const subscription = await Subscription.create({
                channel: channelId,
                subscriber: req.user._id
            });

            if (!subscription) {
                throw new ApiError(500, "Something went wrong while subscribing");
            }

            return res.status(201).json(
                new ApiResponse(
                    201,
                    {
                        ...subscription,
                        isSubscribed: true
                    },
                    "Subscription subscribed successfully"
                )
            );
        }
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while toggling subscription");
    }
});


// controller to return subscriber list of a channel
export const getChannelSubscribers = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params

        if (!channelId) {
            throw new ApiError(400, "Channel id is required")
        }


        if (!isValidObjectId(channelId)) {
            throw new ApiError(400, "Invalid channel id")
        }


        const getChannelSubscribers = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(channelId)
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $unwind: "$subscribers"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscribers.subscriber",
                    foreignField: "_id",
                    as: "subscriber_details"
                }
            },
            {
                $unwind: "$subscriber_details"
            },
            {
                $project: {
                    _id: 0,
                    subscriber: "$subscriber_details._id",
                    username: "$subscriber_details.username",
                    fullName: "$subscriber_details.fullName",
                    avatar: "$subscriber_details.avatar"
                }
            }
        ]);
        

        if (!getChannelSubscribers?.length) {
            throw new ApiError(404, "Channel does not have any subscribers")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                getChannelSubscribers,
                "Subscribers fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching subscribers")
    }
})


// controller to return channel list to which user has subscribed
export const getSubscribedChannels = asyncHandler(async (req, res) => {
    try {
        const { subscriberId } = req.params

        if (!subscriberId) {
            throw new ApiError(400, "Subscriber id is required")
        }


        if (!isValidObjectId(subscriberId)) {
            throw new ApiError(400, "Invalid subscriber id")
        }


        const getSubscribedChannels = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(subscriberId)
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedChannels"
                }
            },
            {
                $unwind: "$subscribedChannels"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscribedChannels.channel",
                    foreignField: "_id",
                    as: "channel_details"
                }
            },
            {
                $unwind: "$channel_details"
            },
            {
                $project: {
                    _id: 0,
                    channel: "$channel_details._id",
                    username: "$channel_details.username",
                    fullName: "$channel_details.fullName",
                    avatar: "$channel_details.avatar"
                }
            }
        ]);
        

        if (!getSubscribedChannels?.length) {
            throw new ApiError(404, "User does not subscribed any channels")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                getSubscribedChannels,
                "Subscribed channels fetched successfully"
            )
        )        
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching subscribers")
    }
})