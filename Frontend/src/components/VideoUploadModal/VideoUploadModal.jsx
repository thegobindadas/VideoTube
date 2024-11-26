import React, { useState } from 'react'
import { VideoFileInput, VideoThumbnailInput, VideoTitleInput, VideoDescriptionInput, Button } from "../index"
import { useForm } from 'react-hook-form'
import { handleError } from "../../utils/errorHandler"
import videoServices from "../../services/videoServices"

function VideoUploadModal({ isOpen, onClose }) {
    
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleUploadVideo = async (data) => {
        setLoading(true);
        setError("")
        try {
            const videoData = {}

            videoData.title = data.title;
            videoData.description = data.description;

            if (data.videoFile.length > 0) {
                videoData.videoFile = data.videoFile[0]
            }

            if (data.thumbnail.length > 0) {
                videoData.thumbnail = data.thumbnail[0]
            }
        
            console.log(videoData);
            
            
            const res = await videoServices.uploadAVideo(videoData)
        
            if (res.success) {
                console.log("Video uploaded successfully: ", res);
                onClose();
            }
            
        } catch (error) {
            console.error(error);
            setError(handleError(error));
        } finally {
            setLoading(false);
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
            <div className="h-full overflow-auto border bg-[#121212]">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-xl font-semibold">Upload Videos</h2>

                    <div className="ml-auto flex gap-4">
                        <Button
                         onClick={onClose}
                         width=""
                         className="group/btn flex w-auto items-center gap-x-2 px-3 py-2"
                        > Close </Button>
                        <Button
                         onClick={handleSubmit(handleUploadVideo)}
                         width=""
                         className="group/btn flex w-auto items-center gap-x-2 px-3 py-2"
                        > {loading ? "Uploading..." : "Save"} </Button>
                    </div>
                    
                </div>

                
                <form onSubmit={handleSubmit(handleUploadVideo)} className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
                
                    <VideoFileInput
                        type="file"
                        {...register("videoFile", { required: "Video file is required" })}
                    />
                    {errors.videoFile && <p className="text-red-500">{errors.videoFile.message}</p>}


                    <VideoThumbnailInput
                        label="Thumbnail"
                        type="file"
                        {...register("thumbnail", { required: "Thumbnail is required" })}
                    />
                    {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}


                    <VideoTitleInput
                        label="Title"
                        type="text"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}


                    <VideoDescriptionInput
                        label="Description"
                        type="text"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                
                
                </form>
            </div>
        </div>
    )
}

export default VideoUploadModal

