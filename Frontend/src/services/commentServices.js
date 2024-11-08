import axios from 'axios';


export class CommentServices {

    getToken() {
        return localStorage.getItem('token');
    }


    
    async fetchComments(videoId, page=1) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/comment/video/${videoId}`, {
                params: {
                    page: page,
                    limit: 3
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while fetching comments of video: ", error.message);
            throw error;
        }
    }


    async addComment(videoId, content) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v1/comment/${videoId}`, { content }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while fetching comments of video: ", error.message);
            throw error;
        }
    }


    async updateComment(commentId, content) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/comment/update/${commentId}`);
                        
            return response.data;
        } catch (error) {
            console.error("Error while fetching comments of video: ", error.message);
            throw error;
        }
    }


    async deleteComment(commentId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/comment/delete/${commentId}`);
                        
            return response.data;
        } catch (error) {
            console.error("Error while deleting comments of video: ", error.message);
            throw error;
        }
    }

}


const commentServices = new CommentServices();

export default commentServices