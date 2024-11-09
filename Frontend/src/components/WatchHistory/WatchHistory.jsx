import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    setHistory, 
    setLoading, 
    setError, 
    setPage, 
    setHasMore 
} from '../../store/watchHistorySlice';
import userService from "../../services/userService"
import { WatchHistoryCard } from "../index"


function WatchHistory() {
    const dispatch = useDispatch();
    const { history: watchHistory, loading, page, hasMore } = useSelector((state) => state.watchHistory);
    const loader = useRef(null);
    const [totalPages, setTotalPages] = useState(1);


    const fetchWatchHistory = useCallback(async (page) => {
        try {
            dispatch(setLoading(true));            
                       
            const response = await userService.getUserWatchHistory(page)

            const fetchedWatchHistory = response.data.watchHistory;
            console.log(fetchedWatchHistory);
            
            setTotalPages(response.data.totalPages);

            if (page >= response.data.totalPages) {
                dispatch(setHasMore(false));
            }

            dispatch(setHistory(fetchedWatchHistory));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);
    


    useEffect(() => {
        if (page <= totalPages) {
            fetchWatchHistory(page);
        }
    }, [fetchWatchHistory, page, totalPages]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading && page < totalPages) {
                    dispatch(setPage(page + 1));
                }
            },
            {
                threshold: 1.0
            }
        );

        if (loader.current) observer.observe(loader.current);
        return () => observer.disconnect();
    }, [hasMore, loading, dispatch, page, totalPages]);


  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex flex-col gap-4 p-4">
            {watchHistory.length > 0 ? (
                watchHistory.map((video) => (
                    <Link to={`/watch/${video._id}`} key={video._id}>
                        <WatchHistoryCard
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

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {/* If there are no more videos, show a message */}
        {page >= totalPages && (
            <p className="text-center text-gray-500">No more videos to load.</p>
        )}
        <div ref={loader} className="loader"></div>
    </section>
  )
}


export default WatchHistory