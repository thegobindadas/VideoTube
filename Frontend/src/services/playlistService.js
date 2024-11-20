import axios from 'axios';

export class PlaylistService {

    getToken() {
        return localStorage.getItem('token');
    }



    async createANewPlaylist(name) {
        const token = this.getToken();
        try {
            const response = await axios.post('/api/v1/playlist/', { name }, {
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


    async fetchPlaylistById(playlistId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/playlist/${playlistId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error while fetching playlist: ', error.message);
            throw error;
        }
    }


    async fetchPlaylistVideos(playlistId, page) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/playlist/${playlistId}/videos`, {
                params: {
                    page: page,
                    limit: 5
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error while fetching playlist videos: ', error.message);
            throw error;
        }
    }


    async getMyPlaylists(page=1) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/playlist/my-playlists`, {
                params: {
                    page: page,
                    limit: 2
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (Array.isArray(response.data.data.playlists)) {
                return response.data;
            } else {
                throw new Error('Playlists data is not in the expected format');
            }
        } catch (error) {
            console.error('Error while fetching my playlists: ', error.message);
            throw error;
        }
    }


    async addVideoToPlaylist(videoId, playlistId) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v1/playlist/add/video/${videoId}/${playlistId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error while adding video to playlist: ', error.message);
            throw error;
        }
    }


    async removeVideoFromPlaylist(videoId, playlistId) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v1/playlist/remove/video/${videoId}/${playlistId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error while removing video from playlist: ', error.message);
            throw error;
        }
    }
}


const playlistService = new PlaylistService();

export default playlistService