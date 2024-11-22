import React, { useEffect, useRef, useCallback } from 'react'
import { PeopleIcon } from "../../assets"
import { Loader, NoContentMessage, ChannelTweetTabCard } from "../index"
import { useDispatch, useSelector } from 'react-redux';
import { setTweets, setLoading, setError, setPage, setHasMore, resetTweets } from "../../store/channelTweetSlice"
import tweetService from "../../services/tweetService"

function ChannelTweetTab({ channelId }) {

  const dispatch = useDispatch();
  const { tweets, loading, error, page, hasMore } = useSelector((state) => state.channelTweets);
  const observerRef = useRef();


  const fetchTweets = useCallback(async () => {
    try {
        dispatch(setLoading(true));
        const response = await tweetService.getUserTweets(channelId, page);
        dispatch(setTweets({
            tweets: response.data.tweets,
            totalTweets: response.data.totalTweets,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
        }));
        console.log(response.data.tweets);
        
        dispatch(setHasMore(response.data.currentPage < response.data.totalPages));
    } catch (err) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoading(false));
    }
}, [dispatch, channelId, page]);

useEffect(() => {
    fetchTweets();
}, [fetchTweets]);

const lastTweetRef = useCallback(
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
    text: "This channel has yet to make a <strong>Tweet</strong> .",
  };


  if (tweets.length === 0 && !loading) {
    return (
      <div className="flex justify-center p-4">
        <NoContentMessage Icon={PeopleIcon} message={noContentMessages} />
      </div>
    );
  }

  return (
    <div className="py-4">
        {tweets.map((tweet, index) => {
            if (tweets.length === index + 1) {
                return (
                    <ChannelTweetTabCard
                        ref={lastTweetRef}
                        key={tweet._id}
                        tweet={tweet}
                    />
                );
            }
            return <ChannelTweetTabCard key={tweet._id} tweet={tweet} />;
        })}
        {loading && <p>Loading more tweets...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}

export default ChannelTweetTab
