import axios from 'axios';


export class TweetService {

    getToken() {
        return localStorage.getItem('token');
    }


    async writeNewTweet(content) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v1/tweet/`, {content}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                        
            return response.data
        } catch (error) {
            console.error("Error while writing new tweet: ", error.message);
            throw error;
        }
    }


    async getUserTweets(userId, page=1) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/tweet/user/${userId}`, {
                params: {
                    page: page,
                    limit: 3
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                        
            return response.data
        } catch (error) {
            console.error("Error while fetching user tweets: ", error.message);
            throw error;
        }
    }


    async togggleTweetLikeDislike(tweetId, type) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v1/like/toggle/tweet/${tweetId}`, {type}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data
        } catch (error) {
            console.error("Error while toggling tweet like dislike: ", error.message);
            throw error;
        }
    }


    async isTweetLikeDislike(tweetId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/like/tweet/${tweetId}/like-status`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data
        } catch (error) {
            console.error("Error while checking tweet is liked or disliked by user: ", error.message);
            throw error;
        }
    }

}


const tweetService = new TweetService();

export default tweetService