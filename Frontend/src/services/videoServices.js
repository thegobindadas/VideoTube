import axios from 'axios';


export class VideoServices {

    getToken() {
        return localStorage.getItem('token');
    }


    async fetchAllVideos(page) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/video`, {
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


    async fetchVideoById(videoId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/video/${videoId}`, {
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


    async incrementVideoViews(videoId) {
        const token = this.getToken();
        try {
            const response = axios.post(`/api/v1/video/${videoId}/view`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error('Error while incrementing views: ', error.message);
            throw error;
        }
    }


    async toggleVideoLikeDislike(videoId, type) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v1/like/video/${videoId}/like-toggle`, { type }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error('Error while toggleing like/dislike: ', error.message);
            throw error;
        }
    }


    async isVideoLikeDislike(videoId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/like/video/${videoId}/like-status`, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error('Error while checking video is liked or disliked by user: ', error.message);
            throw error;
        }
    }


    async videoLikeDislikeCount(videoId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/video/${videoId}/like-dislike-counts`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error('Error while fetching like, dislike count: ', error.message);
            throw error;
        }
    }


    async getVideoOwnerDetails(channelId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/video/owner/${channelId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error('Error while fetching video owner details: ', error.message);
            throw error;
        }
    }


    async getRecommendationVideos(videoId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/video/${videoId}/recommendations`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error('Error while fetching recommendation videos: ', error.message);
            throw error;
        }
    }

}



const videoServices = new VideoServices();

export default videoServices