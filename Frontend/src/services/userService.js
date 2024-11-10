import axios from 'axios';


export class UserService {

    getToken() {
        return localStorage.getItem('token');
    }


    async getCurrentUser() {
        const token = this.getToken();
        try {
            const response = await axios.get('/api/v1/user/current', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                        
            return response.data
        } catch (error) {
            throw error;
        }
    }


    async getUserChannelProfile(username) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/user/channel/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
 
            return response.data
        } catch (error) {
            throw error;
        }
    }


    async getUserWatchHistory(page=1) {
        const token = this.getToken();
        try {
            const response = await axios.get('/api/v1/user/watch-history', {
                params: {
                    page,
                    limit: 4
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
                        
            return response.data
        } catch (error) {
            throw error;
        }
    }

}


const userService = new UserService();

export default userService