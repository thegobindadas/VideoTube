import axios from 'axios';


export class AuthService {

    async registerUser({registerData}) {
        try {
            const response = await axios.post(`/api/v2/users/register`, registerData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error while registering user: ", error.message);
            throw error;
        }
    }


    async loginUser({loginData}) {
        try {
            const response = await axios.post(`/api/v2/users/login`, loginData)

            if (response?.data?.data) {
                const { accessToken, refreshToken } = response.data.data; 
                localStorage.setItem('token', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
            }

            return response.data;
        } catch (error) {
            console.error("Error while logging in user: ", error.message);
            throw error;
        }
    }


    async logoutUser() {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v2/users/logout`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); 

            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            return response.data;
        } catch (error) {
            console.error("Error while logging out user: ", error.message);
            throw error;
        }
    }
    
}



const authService = new AuthService();

export default authService