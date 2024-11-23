import React, {useRef, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PeopleIcon } from "../../assets"
import { NoContentMessage, SearchSubscribedChannel, ChannelSubscribedTabCard } from "../index"
import { setSubscribedChannels, setLoading, setError, setPage, setHasMore, resetSubscribedChannels } from "../../store/subscribedChannelSlice"
import subscriptionServices from '../../services/subscriptionServices';

function ChannelSubscribedTab({ channelId }) {

    const dispatch = useDispatch();
    const { subscribedChannels, loading, error, page, hasMore } = useSelector((state) => state.subscribedChannels);
    const observerRef = useRef();


    const fetchSubscribedChannels = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const response = await subscriptionServices.getSubscribedChannels(channelId, page);
            dispatch(setSubscribedChannels({
                subscribedChannels: response.data.subscribedChannels,
                totalSubscribedChannels: response.data.totalSubscribedChannels,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
            }));
            console.log(response.data.subscribedChannels);
            
            dispatch(setHasMore(response.data.currentPage < response.data.totalPages));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, channelId, page]);

    useEffect(() => {
        fetchSubscribedChannels();
    }, [fetchSubscribedChannels]);

    
    const lastSubscribedChannelRef = useCallback(
        (node) => {
            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    dispatch(setPage(page + 1));
                }
            });
            if (node) observerRef.current.observe(node);
        },
        [loading, hasMore, dispatch, page]
    );


  const noContentMessages = {
    title: "No Tweets",
    text: "This channel has yet to make a Tweet.",
  };

  if (subscribedChannels.length === 0 && !loading) {
    return (
      <div className="flex justify-center p-4">
        <NoContentMessage Icon={PeopleIcon} message={noContentMessages} />
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-y-4 py-4">
    
        <SearchSubscribedChannel channelId={channelId} />

        {subscribedChannels.map((subscribedChannel, index) => {
            if (subscribedChannels.length === index + 1) {
                return (
                    <ChannelSubscribedTabCard
                        ref={lastSubscribedChannelRef}
                        key={subscribedChannel._id}
                        subscribedChannel={subscribedChannel}
                    />
                );
            }
            return <ChannelSubscribedTabCard key={subscribedChannel._id} subscribedChannel={subscribedChannel} />;
        })}

        {loading && <p>Loading more tweets...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  )
}

export default ChannelSubscribedTab
