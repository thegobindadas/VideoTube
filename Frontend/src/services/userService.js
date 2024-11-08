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

}


const userService = new UserService();

export default userService