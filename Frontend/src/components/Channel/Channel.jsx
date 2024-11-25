import React, { useState, useEffect } from 'react'
import { EditIcon } from "../../assets"
import { Button, SubscribeBtn, ChannelTabs, ChannelCoverPhoto, ChannelInfo, ChannelVideoTab, ChannelPlaylistTab, ChannelTweetTab, ChannelSubscribedTab  } from "../index"
import { useDispatch, useSelector } from 'react-redux';
import { setChannelData, setLoading, setError, resetChannelData } from '../../store/channelSlice';
import userService from "../../services/userService"

function Channel({ username }) {

    const coverImg = "https://res.cloudinary.com/dceqm6gbx/image/upload/v1729432880/videohub/gkd0nxjlcr6hnscqq7h6.jpg"
    const { channel, loading, error } = useSelector((state) => state.channel);
    const userData = useSelector((state) => state.user.user)
    const [activeTab, setActiveTab] = useState('videos');
    const dispatch = useDispatch();

    //console.log(userData);
    //console.log(channel);
    
    const isChannelOwner = channel?._id === userData?._id;
    console.log(isChannelOwner);
    

    const tabs = [
        { id: 'videos', label: 'Videos' },
        { id: 'playlist', label: 'Playlist' },
        { id: 'tweets', label: 'Tweets' },
        { id: 'subscribed', label: 'Subscribed' },
    ];
    
    useEffect(() => {
        const fetchChannelData = async () => {
            dispatch(setLoading(true));
            try {
                const response = await userService.getUserChannelProfile(username);
                dispatch(setChannelData(response.data));
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchChannelData();

        return () => {
            dispatch(resetChannelData());
        };
    }, [username, dispatch]);
    


    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case 'videos':
                return <ChannelVideoTab channelId={channel._id} />;
            case 'playlist':
                return <ChannelPlaylistTab channelId={channel._id} />;
            case 'tweets':
                return <ChannelTweetTab channelId={channel._id} />;
            case 'subscribed':
                return <ChannelSubscribedTab channelId={channel._id} />;
            default:
                return null;
        }
    };




  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!channel) return <div>No channel data available</div>;


  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        
        <ChannelCoverPhoto coverImage={channel.coverImage || coverImg} alt={channel.fullName} />

        <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-4 pb-4 pt-6">
                <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                    <img
                        src={channel.avatar}
                        alt={channel.fullName}
                        className="h-full w-full" />
                </span>

                <ChannelInfo 
                    name={channel.fullName} 
                    handle={channel.username} 
                    subscribers={channel.subscribersCount} 
                    subscribed={channel.subscribedToCount} />

                <div className="inline-block">
                    {isChannelOwner ? (
                        <Button className = "group/btn mr-1 flex items-center gap-x-2  px-3 py-2 sm:w-auto">
                            <span className="inline-block w-5">
                                <EditIcon /> 
                            </span>    
                            Edit
                        </Button>
                    ) : (
                        <div className="inline-flex min-w-[145px] justify-end">
                            <SubscribeBtn channelId={channel._id} subscriptionStatus={channel.isSubscribed} />
                        </div>
                    )}
                    
                </div>
            </div>

            <ChannelTabs tabs={tabs} onTabChange={handleTabChange} />
            {renderTabContent()}
        </div>
    </section>
  )
}

export default Channel
