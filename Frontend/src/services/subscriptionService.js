import axios from 'axios';


export class SubscriptionService {

    getToken() {
        return localStorage.getItem('token');
    }



    async toggleSubscription({channelId}) {
        const token = this.getToken();
        try {
            const response = await axios.post(`/api/v2/subscriptions/channel/${channelId}/subscribe`,
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


    async checkSubscriptionStatus({channelId}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/subscriptions/channel/${channelId}/status`,
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


    async getSubscribedChannels({userId, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/subscriptions/channel/subscribed-channels`,
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
            console.error("Error while fetching user subscribed channels: ", error.message);
            throw error;
        }
    }


    async searchSubscribedChannels({userId, search, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/subscriptions/search/channel/subscribed-channels`,
                {
                    params: {
                        userId,
                        search,
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
            console.error("Error while searching subscribed channels: ", error.message);
            throw error;
        }
    }


    async getChannelSubscribersList({userId, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/subscriptions/channel/subscribers`,
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
            console.error("Error while fetching channel subscribers: ", error.message);
            throw error;
        }
    }


    async searchChannelSubscribers({userId, search, page=1}) {
        const token = this.getToken();
        try {
            const response = await axios.get(`/api/v2/subscriptions/search/channel/subscribers`,
                {
                    params: {
                        userId,
                        search,
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
            console.error("Error while searching subscribed channels: ", error.message);
            throw error;
        }
    }

}



const subscriptionService = new SubscriptionService();

export default subscriptionService