import axios from 'axios';


export class PlaylistService {

    getToken() {
        return localStorage.getItem('token');
    }



    async createANewPlaylist({name}) {
        const token = this.getToken();
        try {
            const response = await axios.post('/api/v2/playlists/', { name }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                        
            return response.data
        } catch (error) {
            console.error("Error while creating playlist: ", error.message);
            throw error;
        }
    }


    async getUserPlaylists({userId, page = 1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/playlists/user`, {
                params: {
                    userId: userId,
                    page: page,
                    limit: 2
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error while fetching user playlists: ", error.message);
            throw error;
        }
    }


    async fetchPlaylistById({playlistId}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/playlists/${playlistId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error while fetching playlist details: ", error.message);
            throw error;
        }
    }


    async fetchPlaylistVideos({playlistId, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/playlists/${playlistId}/videos`, {
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
            console.error("Error while fetching playlist videos: ", error.message);
            throw error;
        }
    }


    async getPlaylistDetailsWithVideos({playlistId, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/playlists/${playlistId}/details-with-videos`, {
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
            console.error("Error while fetching playlist details with videos: ", error.message);
            throw error;
        }
    }


    async getMyPlaylistNames({page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/playlists/me/names`, {
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
                throw new Error("Playlists data is not in the expected format");
            }
        } catch (error) {
            console.error("Error while fetching my playlist names: ", error.message);
            throw error;
        }
    }


    async addVideoToPlaylist({playlistId, videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v2/playlists/${playlistId}/add/videos/${videoId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Error while adding video to playlist: ", error.message);
            throw error;
        }
    }


    async removeVideoFromPlaylist({playlistId, videoId}) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v2/playlists/${playlistId}/remove/videos/${videoId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Error while removing video from playlist: ", error.message);
            throw error;
        }
    }


    async updatePlaylistDetails({ playlistId, name, description }) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v2/playlists/update-details/${playlistId}`,
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            return response.data;
        } catch (error) {
            console.error("Error while updating playlist details: ", error.message);
            throw error;
        }
    }
    

    async togglePlaylistVisibility({playlistId}) {
        const token = this.getToken();
        try {
            const response = await axios.patch(`/api/v2/playlists/${playlistId}/toggle-public`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            return response.data;
        } catch (error) {
            console.error("Error while toggling playlist visibility: ", error.message);
            throw error;
        }
    }
    

    async deletePlaylist({playlistId}) {
        const token = this.getToken();
        try {
            const response = await axios.delete(`/api/v2/playlists/remove/${playlistId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            return response.data;
        } catch (error) {
            console.error("Error while deleting the playlist: ", error.message);
            throw error;
        }
    }
    
}



const playlistService = new PlaylistService();

export default playlistService