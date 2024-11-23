import axios from 'axios';


export class SubscriptionServices {

    getToken() {
        return localStorage.getItem('token');
    }


    async toggleSubscription(channelId) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v1/subscription/c/${channelId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
                        
            return response.data
        } catch (error) {
            console.error("Error while toggling subscription: ", error.message);
            throw error;
        }
    }


    async getSubscriptionStatus(channelId) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/subscription/c/subscription-status/${channelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
                        
            return response.data
        } catch (error) {
            console.error("Error while checking subscription status: ", error.message);
            throw error;
        }
    }


    async getSubscribedChannels(userId, page=1) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v1/subscription/subscribed-channels`,
                {
                    params: {
                        userId,
                        page,
                        limit: 5,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
                        
            return response.data
        } catch (error) {
            console.error("Error while fetching subscribed channels: ", error.message);
            throw error;
        }
    }
}


const subscriptionServices = new SubscriptionServices();

export default subscriptionServices