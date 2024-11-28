import React, { useState } from 'react'
import { CancelIcon, LoadingIcon, TableGridIcon, CheckCircleIcon} from "../../assets"
import { VideoFileInput, VideoThumbnailInput, VideoTitleInput, VideoDescriptionInput, Button } from "../index"
import { useForm } from 'react-hook-form'
import { handleError } from "../../utils/errorHandler"
import { formatFileSize } from "../../utils/fileSizeUtils"
import videoServices from "../../services/videoServices"

function VideoUploadModal({ isOpen, onClose }) {
    
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadState, setUploadState] = useState("idle"); // 'idle', 'uploading', 'success'
    const [videoInfo, setVideoInfo] = useState({});
    const [error, setError] = useState("");
    

    
    const handleUploadVideo = async (data) => {
        setLoading(true);
        setUploadState("uploading");
        setError("")
        try {

            const videoData = {
                title: data.title,
                description: data.description,
            }

            if (data.videoFile?.length > 0) videoData.videoFile = data.videoFile[0];
            if (data.thumbnail?.length > 0) videoData.thumbnail = data.thumbnail[0];
        
            setVideoInfo(videoData);
            
            
            const res = await videoServices.uploadAVideo(videoData, (event) => {
                if (event.lengthComputable) {
                    const progressValue = Math.round((event.loaded / event.total) * 100);
                    setProgress(progressValue);
                }
            });
            
        
            if (res.success) {
                console.log("Video uploaded successfully: ", res);
                setUploadState("success");
                /*
                setTimeout(() => {
                    setUploadState("idle");
                    onClose();
                }, 2000); */
            }
            
        } catch (error) {
            console.error(error);
            setError(handleError(error));
            setUploadState("idle");
        } finally {
            setLoading(false);
        }
    };
    

    if (!isOpen) return null;

    const renderUploadPopup = () => (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-lg border border-gray-700 bg-[#121212] p-4">
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        {uploadState === "uploading" ? "Uploading Video..." : "Video Uploaded"}
                        <span className="block text-sm text-gray-300">
                            {uploadState === "uploading"
                                ? "Track your video uploading process."
                                : "Your video has been uploaded successfully."}
                        </span>
                    </h2>
                    <button className="h-6 w-6" onClick={onClose}>
                        <CancelIcon />
                    </button>
                </div>
    
    
                <div className="mb-6 flex gap-x-2 border p-3">
                    <div className="w-8 shrink-0">
                        <span className="inline-block w-full rounded-full bg-[#E4D3FF] p-1 text-[#AE7AFF]">
                            <TableGridIcon />
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <h6>{`${videoInfo.title}.mp4`}</h6>
                        <p className="text-sm">{formatFileSize(videoInfo.videoFile.size)}</p>
                        {uploadState === "uploading" ? (
                            <div className="mt-2">
                                <LoadingIcon />
                                Uploading...
                            </div>
                        ) : (
                            <div className="mt-2 flex items-center">
                                <span className="mr-2 inline-block w-6 text-[#ae7aff]">
                                    <CheckCircleIcon />
                                </span>
                                Uploaded Successfully
                            </div>
                        )}
                    </div>
                </div>
    
    
                <div className="grid grid-cols-2 gap-4">
                    <button className="border px-4 py-3">Cancel</button>
                    <button
                        className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
                        disabled={uploadState === "uploading" || loading === true}
                        onClick={() => {
                            setUploadState("idle");
                            onClose(); // Close the modal
                        }}
                        >
                        Finish
                    </button>
                </div>
    
            </div>
        </div>
    );

    return (
        <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
            {uploadState !== "idle" && renderUploadPopup()}

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
                         disabled={loading}
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