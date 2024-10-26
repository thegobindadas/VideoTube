import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Sidebar, VideoListItem } from "../components/index"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    setHistory, 
    setLoading, 
    setError, 
    setPage, 
    setHasMore 
} from '../store/watchHistorySlice';
import axios from 'axios';


function WatchHistoryPage() {
    const dispatch = useDispatch();
    const { history: watchHistory, loading, page, hasMore } = useSelector((state) => state.watchHistory);
    const loader = useRef(null);

    const fetchWatchHistory = useCallback(async () => {
        if (!hasMore || loading) return;

        dispatch(setLoading(true));
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/v1/user/watch-history', {
                params: {
                    page,
                    limit: 5
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const { watchHistory, totalPages } = response.data.data;
            console.log(watchHistory);
            

            dispatch(setHistory(watchHistory));

            // Check if the current page is the last page
            if (page >= totalPages) {
                dispatch(setHasMore(false));
            }
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false)); // Always stop loading at the end
        }
    }, [dispatch, hasMore, loading, page]);

    useEffect(() => {
        fetchWatchHistory();
    }, [page, hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    dispatch(setPage(page + 1)); // Increment page for next fetch
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (loader.current) observer.observe(loader.current);
        return () => observer.disconnect();
    }, [hasMore, loading, dispatch, page]);

    return (
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <Sidebar />

            <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                <div className="flex flex-col gap-4 p-4">
                    {watchHistory.length > 0 ? (
                        watchHistory.map((video) => (
                            <Link to={`/watch/${video._id}`} key={video._id}>
                                <VideoListItem
                                    key={video._id}
                                    _id={video._id}
                                    thumbnail={video.thumbnail}
                                    duration={video.duration}
                                    avatar={video.owner.avatar}
                                    title={video.title}
                                    views={video.views}
                                    createdAt={video.createdAt}
                                    author={video.owner.fullName}
                                    authorId={video.owner._id}
                                    description={video.description}
                                />
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No watch history available.</p>
                    )}
                </div>

                {/* Show a message if there are no more videos to load */}
                {!hasMore && watchHistory.length > 0 && (
                    <p className="text-center text-gray-500">No more videos to load.</p>
                )}

                {/* Always show the loader when loading is true, indicating data is being fetched */}
                {loading && (
                    <div className="loader">Loading...</div>
                )}
                <div ref={loader} className="loader" style={{ height: '50px' }}></div> {/* Loader for infinite scrolling */}
            </section>
        </div>
    );
}






export default WatchHistoryPage