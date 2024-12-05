import axios from 'axios';


export class VideoService {

    getToken() {
        return localStorage.getItem('token');
    }



    async uploadAVideo({videoData, onUploadProgress}) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v2/videos/`, videoData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while uploading video: ", error.message);
            throw error;
        }
    }


    async updateVideoInfo({videoId, updatedData}) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v2/videos/${videoId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("Error while updating video info: ", error.message);
            throw error;
        }
    }
    

    async fetchAllVideos({page}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/videos/`, {
                params: {
                    page: page,
                    limit: 9
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while fetching all videos: ", error.message);
            throw error;
        }
    }


    async getVideoById({videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/videos/${videoId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while fetching video by id: ", error.message);
            throw error;
        }
    }


    async handleVideoViews({videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v2/videos/${videoId}/view`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while handeling video views: ", error.message);
            throw error;
        }
    }


    async toggleVideoPublishStatus({videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v2/videos/${videoId}/toggle-publish`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("Error toggling video publish status: ", error.message);
            throw error;
        }
    }
    

    async toggleVideoLikeDislike({videoId, type}) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v2/likedislikes/video/${videoId}/like-toggle`, { type }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while toggleing like/dislike: ", error.message);
            throw error;
        }
    }


    async isVideoLikeDislikeByUser({videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/likedislikes/video/${videoId}/like-status`, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while checking video is liked or disliked by user: ", error.message);
            throw error;
        }
    }


    async getRecommendationVideos({videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/videos/${videoId}/recommendations`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while fetching recommendation videos: ", error.message);
            throw error;
        }
    }


    async getVideosByChannel({channelId, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/videos/channel/${channelId}/videos`, {
                params: {
                    page: page,
                    limit: 4
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while fetching channel videos: ", error.message);
            throw error;
        }
    }


    async getLikedVideos({page = 1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/videos/me/liked-videos`, {
                params: {
                    page: page,
                    limit: 10
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            console.error("Error while fetching liked videos: ", error.message);
            throw error;
        }
    }
    

    async deleteVideo({videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.delete(`/api/v2/videos/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("Error deleting video: ", error.message);
            throw error;
        }
    }
    
}



const videoService = new VideoService();

export default videoService