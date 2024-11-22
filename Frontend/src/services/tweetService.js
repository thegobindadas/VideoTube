import axios from 'axios';


export class TweetService {

    getToken() {
        return localStorage.getItem('token');
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


}


const tweetService = new TweetService();

export default tweetService