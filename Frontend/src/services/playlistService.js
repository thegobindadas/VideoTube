import axios from 'axios';

export class PlaylistService {

    getToken() {
        return localStorage.getItem('token');
    }



    async createANewPlaylist() {
        const token = this.getToken();
        try {
            const response = await axios.post('/api/v1/playlist/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                        
            return response.data
        } catch (error) {
            console.error('Error while creating playlist: ', error.message);
            throw error;
        }
    }



    async getUserPlaylists(userId, page = 1) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/playlist/user/${userId}`, {
                params: {
                    page: page,
                    limit: 2
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error while fetching user playlists: ', error.message);
            throw error;
        }
    }

}


const playlistService = new PlaylistService();

export default playlistService