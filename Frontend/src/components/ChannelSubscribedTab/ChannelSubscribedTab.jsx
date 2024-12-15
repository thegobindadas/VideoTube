import React, { useRef, useEffect, useCallback, useState } from 'react';
import { PeopleIcon } from "../../assets";
import { Loader, NoContentMessage, SearchSubscribedChannel, ChannelSubscribedTabCard } from "../index";
import { useDispatch, useSelector } from 'react-redux';
import { setSubscribedChannels, setLoading, setError, setPage, setHasMore, resetSubscribedChannels } from "../../store/subscribedChannelSlice";
import subscriptionService from '../../services/subscriptionService';

function ChannelSubscribedTab({ channelId }) {

  const dispatch = useDispatch();
  const { subscribedChannels, loading, error, page, hasMore } = useSelector((state) => state.subscribedChannels);
  const observerRef = useRef();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);


  const fetchSubscribedChannels = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await subscriptionService.getSubscribedChannels({userId: channelId, page});
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

    return () => {
      dispatch(resetSubscribedChannels());
    };
  }, [fetchSubscribedChannels, dispatch]);

    
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


  const handleSearch = useCallback(async (query) => {
    setIsSearching(true);

    try {
      const search = query.trim();

      if (!search) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      const response = await subscriptionService.searchSubscribedChannels({userId: channelId, search, page});

      setSearchResults(response.data.subscribedChannels || []);
      console.log(response.data.subscribedChannels);
    } catch (err) {
      setSearchResults([]); 
      dispatch(setError(`Search error: ${err.message}`));
    } finally {
      setIsSearching(false);
    } 
  }, [channelId, dispatch, page]);
    



  const noContentMessages = {
    title: "No Channels Found",
    text: isSearching
      ? "No results match your search query."
      : "This channel has yet to subscribe to anyone.",
  };

  if (!loading && subscribedChannels.length === 0 && searchResults.length === 0) {
    return (
      <div className="flex justify-center p-4">
        <NoContentMessage Icon={PeopleIcon} message={noContentMessages} />
      </div>
    );
  }


  const channelsToRender = searchResults.length > 0 ? searchResults : subscribedChannels;

  

  return (
    <div className="flex flex-col gap-y-4 py-4">
      <SearchSubscribedChannel channelId={channelId} onSearch={handleSearch} />

      {channelsToRender.length > 0 ? (
        channelsToRender.map((channel, index) => {
          if (searchResults.length === 0 && subscribedChannels.length === index + 1) {
            return (
              <ChannelSubscribedTabCard
                ref={lastSubscribedChannelRef}
                key={channel._id}
                subscribedChannel={channel}
              />
            );
          }
          return (
            <ChannelSubscribedTabCard
              key={channel._id}
              subscribedChannel={channel}
            />
          );
        })
      ) : (
        <div className="flex justify-center p-4">
          <NoContentMessage
            Icon={PeopleIcon}
            message={{
              title: "No Channels Found",
              text: isSearching
                ? "No results match your search query."
                : "This channel has yet to subscribe to anyone.",
            }}
          />
        </div>
      )}

      {loading && <Loader />}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}


export default ChannelSubscribedTab