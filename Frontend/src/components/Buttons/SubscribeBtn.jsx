import React, { useState, useEffect } from 'react';
import { AddProfileIcon } from "../../assets";
import { handleError } from "../../utils/errorHandler";
import subscriptionService from "../../services/subscriptionService";


function SubscribeBtn({ channelId, subscriptionStatus }) {
  
  const [isSubscribed, setIsSubscribed] = useState(subscriptionStatus || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleToggleSubscription = async () => {
    setLoading(true);
    try {
      const subscriptionStatus = await subscriptionService.toggleSubscription({channelId});
      setIsSubscribed(subscriptionStatus.data.isSubscribed);
    } catch (error) {
      console.error("Error toggling subscription: ", handleError(error));
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subscriptionStatus === undefined && channelId) {
      // Fetch only if subscriptionStatus prop is not provided
      const fetchSubscriptionStatus = async () => {
        try {
          const result = await subscriptionService.checkSubscriptionStatus({channelId});
          setIsSubscribed(result.data.isSubscribed);
        } catch (error) {
          console.error("Error checking subscription status: ", handleError(error));
          setError(handleError(error));
        }
      };
      fetchSubscriptionStatus();
    }
  }, [channelId, subscriptionStatus]);


  return (
    <button
      className={`group mr-1 flex w-full items-center gap-x-2 ${
        isSubscribed ? 'bg-gray-400' : 'bg-[#ae7aff]'
      } px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}
      onClick={handleToggleSubscription}
      disabled={loading} // Disable button while loading
    >
      <span className="inline-block w-5">
        <AddProfileIcon />
      </span>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <span className="group-focus/btn:hidden">
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </span>
      )}
    </button>
  );
}


export default SubscribeBtn;