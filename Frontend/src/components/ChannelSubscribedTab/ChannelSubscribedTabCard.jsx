import React, { forwardRef, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatSubscriberCount } from "../../utils/numberUtils"
import subscriptionServices from '../../services/subscriptionServices';

const ChannelSubscribedTabCard = forwardRef(({ subscribedChannel }, ref) => {

    const [isSubscribed, setIsSubscribed] = useState(subscribedChannel.isSubscribedByMe || false);
    const [loading, setLoading] = useState(false);  
    const userData = useSelector((state) => state.user.user)
    const isThisMyChannel = userData._id === subscribedChannel._id
    

    const handleToggleSubscription = async () => {
            setLoading(true);
        try {
            const subscriptionStatus = await subscriptionServices.toggleSubscription(subscribedChannel._id);
            setIsSubscribed(subscriptionStatus.data.isSubscribed);
        } catch (error) {
            console.error("Error toggling subscription: ", error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div ref={ref} className="flex w-full justify-between">
        <div className="flex items-center gap-x-2">
            <div className="h-14 w-14 shrink-0">
                <img
                    src={subscribedChannel.avatar}
                    alt={subscribedChannel.fullName}
                    className="h-full w-full rounded-full" />
            </div>
            <div className="block">
                <h6 className="font-semibold">{subscribedChannel.fullName}</h6>
                <p className="text-sm text-gray-300">{formatSubscriberCount(subscribedChannel.totalSubscribers)}</p>
            </div>
        </div>
        <div className="block">
            {!isThisMyChannel ? (
                <button 
                    className={`group px-3 py-2 text-black ${ isSubscribed ? 'bg-gray-400' : 'bg-[#ae7aff]' } `}
                    onClick={handleToggleSubscription}
                    disabled={loading}
                >
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <span className="group-focus/btn:hidden">
                            {isSubscribed ? 'Subscribed' : 'Subscribe'}
                        </span>
                    )}
                </button>
            ) : null}
        </div>
    </div>
  )
})

export default ChannelSubscribedTabCard
