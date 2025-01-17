import React, { useEffect, useRef, useState, useCallback } from 'react'
import { setVideos, setLoading, setError, setPage, setHasMore, resetVideos } from '../../store/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, VideoGalleryItem } from "../index"
import videoService from "../../services/videoService"
import { handleError } from "../../utils/errorHandler"

function VideoGallery() {

    const dispatch = useDispatch();
    const { videos, loading, error, page, hasMore } = useSelector((state) => state.videos);
    const loader = useRef(null);
    const [totalPages, setTotalPages] = useState(1);


    const fetchVideos = useCallback(async (page) => {
        try {
            dispatch(setLoading(true));            
                       
            const response = await videoService.fetchAllVideos({page})

            const fetchedVideos = response.data.videos;
            setTotalPages(response.data.totalPages);

            if (page >= response.data.totalPages) {
                dispatch(setHasMore(false));
            }

            dispatch(setVideos(fetchedVideos));
        } catch (err) {
            const errMsg = handleError(err)
            dispatch(setError(errMsg));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    
    useEffect(() => {
        if (page <= totalPages) {
            fetchVideos(page);
        }
    }, [fetchVideos, page, totalPages]);


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

    useEffect(() => {
        return () => {
            dispatch(resetVideos());
        };
    }, [dispatch]);



    if (error) return <p>Error: {error}</p>;

    return (
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                {videos.map((video) => (
                    <Link to={`/watch/${video._id}`} key={video._id}>
                        <VideoGalleryItem
                        video={video}
                        />
                    </Link>
                ))}
            </div>
            
            {/* Only show the loader if more videos are available */}
            {loading && hasMore && (
                <div className="text-center">
                    <Loader />
                </div>
            )}

            {/* If there are no more videos, show a message */}
            {page >= totalPages && (
                <p className="text-center text-gray-500">No more videos to load.</p>
            )}
            <div ref={loader} className="loader"></div>
        </section>
    )
}


export default VideoGallery