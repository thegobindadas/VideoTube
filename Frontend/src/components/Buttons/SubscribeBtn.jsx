import React, { useState, useEffect } from 'react';
import subscriptionServices from '../../services/subscriptionServices';

function SubscribeBtn({ channelId, subscriptionStatus }) {
  const [isSubscribed, setIsSubscribed] = useState(subscriptionStatus || false);
  const [loading, setLoading] = useState(false);


  const handleToggleSubscription = async () => {
    setLoading(true);
    try {
      const subscriptionStatus = await subscriptionServices.toggleSubscription(channelId);
      setIsSubscribed(subscriptionStatus.data.isSubscribed);
    } catch (error) {
      console.error("Error toggling subscription: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subscriptionStatus === undefined && channelId) {
      // Fetch only if subscriptionStatus prop is not provided
      const fetchSubscriptionStatus = async () => {
        try {
          const result = await subscriptionServices.getSubscriptionStatus(channelId);
          setIsSubscribed(result.data.isSubscribed);
        } catch (error) {
          console.error("Error checking subscription status: ", error);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
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
