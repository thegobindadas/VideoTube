import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { Video } from "../models/video.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"



export const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required")
    }


    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })

    if (!playlist) {
        throw new ApiError(500, "Something went wrong while creating playlist")
    }



    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                playlist,
                "Playlist created successfully"
            )
        )
})


export const getUserPlaylists = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            throw new ApiError(400, "User id is required")
        }


        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid user id")
        }


        const playlists = await Playlist.find({ owner: userId })

        if (!playlists) {
            throw new ApiError(404, "Playlists not found")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                playlists,
                "Playlists fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching playlists")
    }

})


export const getPlaylistById = asyncHandler(async (req, res) => {
    try {
        const { playlistId } = req.params

        if (!playlistId) {
            throw new ApiError(400, "Playlist id is required")
        }


        if (!isValidObjectId(playlistId)) {
            throw new ApiError(400, "Invalid playlist id")
        }


        const playlist = await Playlist.findById(playlistId)

        if (!playlist) {
            throw new ApiError(404, "Playlist not found")
        }


        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                playlist,
                "Playlist fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching playlist")
    }
})


export const addVideoToPlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId, videoId } = req.params

        if (!playlistId || !videoId) {
            throw new ApiError(400, "Playlist id and video id are required")
        }


        if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid playlist id or video id")
        }


        const playlist = await Playlist.findById(playlistId)

        if (!playlist) {
            throw new ApiError(404, "Playlist not found")
        }


        if (playlist.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Unauthorized to add video to playlist")
        }


        const video = await Video.findById(videoId)

        if (!video) {
            throw new ApiError(404, "Video not found")
        }


        const isVideoAlreadyInPlaylist = playlist.videos.some(video => video._id.toString() === videoId.toString())

        if (isVideoAlreadyInPlaylist) {
            throw new ApiError(400, "Video already in playlist")
        }


        playlist.videos.push(video)

        const updatedPlaylist = await playlist.save({ validateBeforeSave: false })

        if (!updatedPlaylist) {
            throw new ApiError(500, "Something went wrong while adding video to playlist")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "Video added to playlist successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while adding video to playlist")
    }
})


export const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId, videoId } = req.params

        if (!playlistId || !videoId) {
            throw new ApiError(400, "Playlist id and video id are required")
        }


        if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid playlist id or video id")
        }


        const playlist = await Playlist.findById(playlistId)

        if (!playlist) {
            throw new ApiError(404, "Playlist not found")
        }


        if (playlist.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Unauthorized to remove video from playlist")
        }


        const video = await Video.findById(videoId)

        if (!video) {
            throw new ApiError(404, "Video not found")
        }


        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $pull: { videos: videoId } },
            { new: true, validateBeforeSave: false }
        )

        if (!updatedPlaylist) {
            throw new ApiError(500, "Something went wrong while removing video from playlist")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "Video removed from playlist successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while removing video from playlist")
    }
})


export const updatePlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId } = req.params
        const { name, description } = req.body

        if (!playlistId) {
            throw new ApiError(400, "Playlist id is required")
        }


        if (!isValidObjectId(playlistId)) {
            throw new ApiError(400, "Invalid playlist id")
        }


        const playlist = await Playlist.findById(playlistId)

        if (!playlist) {
            throw new ApiError(404, "Playlist not found")
        }


        if (playlist.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Unauthorized to update playlist")
        }


        if(name) {
            playlist.name = name
        }

        if(description) {
            playlist.description = description
        }


        const updatedPlaylist = await playlist.save({ validateBeforeSave: false })

        if (!updatedPlaylist) {
            throw new ApiError(500, "Something went wrong while updating playlist")
        }

        

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "Playlist updated successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while updating playlist")
    }
})


export const deletePlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId } = req.params

        if (!playlistId) {
            throw new ApiError(400, "Playlist id is required")
        }


        if (!isValidObjectId(playlistId)) {
            throw new ApiError(400, "Invalid playlist id")
        }


        const playlist = await Playlist.findById(playlistId)

        if (!playlist) {
            throw new ApiError(404, "Playlist not found")
        }


        if (playlist.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Unauthorized to delete playlist")
        }


        const deletePlaylist = await playlist.deleteOne()

        if (!deletePlaylist) {
            throw new ApiError(500, "Something went wrong while deleting playlist")
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Playlist deleted successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while deleting playlist")
    }
})
