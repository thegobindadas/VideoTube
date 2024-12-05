import axios from 'axios';


export class CommentService {

    getToken() {
        return localStorage.getItem('token');
    }


    
    async fetchVideoComments({videoId, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/comments/${videoId}`, {
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


    async addComment({videoId, content}) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v2/comments/${videoId}`, { content }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while adding comment: ", error.message);
            throw error;
        }
    }


    async updateComment({commentId, content}) {
        const token = this.getToken();
        try {
            const response = await axios.patch( `/api/v2/comments/update/${commentId}`,
                { content }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
                        
            return response.data;
        } catch (error) {
            console.error("Error while updating comment: ", error.message);
            throw error;
        }
    }


    async getCommentLikeDislikeStatus({commentId}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/likedislikes/comment/${commentId}/like-status`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            return response.data;
        } catch (error) {
            console.error("Error while fetching like/dislike status for the comment: ", error.message);
            throw error;
        }
    }
    

    async toggleCommentLikeDislike({commentId, type}) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v2/likedislikes/comment/${commentId}/like-toggle`,
                { type },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            return response.data;
        } catch (error) {
            console.error("Error while toggling like/dislike for the comment: ", error.message);
            throw error;
        }
    }
    

    async deleteComment({commentId}) {
        const token = this.getToken();
        try {
            const response = await axios.delete(`/api/v2/comments/delete/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
                        
            return response.data;
        } catch (error) {
            console.error("Error while deleting comments of video: ", error.message);
            throw error;
        }
    }

}



const commentService = new CommentService();

export default commentService