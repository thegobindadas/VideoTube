import axios from 'axios';


export class UserService {

    getToken() {
        return localStorage.getItem('token');
    }

    

    async getCurrentUser() {
        const token = this.getToken();
        try {
            const response = await axios.get('/api/v2/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                        
            return response.data
        } catch (error) {
            console.error("Error while getting current user: ", error.message);
            throw error;
        }
    }


    async getUserChannelProfile({username}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/users/channel/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
 
            return response.data
        } catch (error) {
            console.error("Error while getting user channel profile: ", error.message);
            throw error;
        }
    }


    async getUserWatchHistory({page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get('/api/v2/users/watch-history', {
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
            console.error("Error while getting user watch history: ", error.message);
            throw error;
        }
    }


    async getChannelData({page = 1}) {
        const token = this.getToken();
        try {
            const response = await axios.get('/api/v2/dashboards/channel/details', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,
                    limit: 5,
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("Error fetching channel dashboard data: ", error.message);
            throw error;
        }
    }

}



const userService = new UserService();

export default userService