import axios from 'axios';

export class AuthService {

    async registerUser(registerData) {
        try {
            const response = await axios.post('/api/v1/user/register', registerData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async loginUser(loginData) {
        try {
            const response = await axios.post('/api/v1/user/login', loginData)

            if (response.data) {
                const { accessToken, refreshToken } = response.data.data; 
                localStorage.setItem('token', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}


const authService = new AuthService();

export default authService

