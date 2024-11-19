import React, { useEffect } from 'react'
import { Loader, ChannelPlaylistOwnerInfo, ChannelPlaylistVideos } from "../index"
import { formatViewsCount } from '../../utils/numberUtils';
import { getTimeAgo } from '../../utils/timeUtils';
import playlistService from "../../services/playlistService"
import { setPlaylistInfo, setLoading, setError, resetPlaylistInfo } from "../../store/playlistInfoSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function ChannelPlaylist() {

    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const { playlistInfo, loading, error } = useSelector((state) => state.playlistInfo);


    useEffect(() => {
        const fetchPlaylist = async () => {
            dispatch(setLoading());
            try {
                const response = await playlistService.fetchPlaylistById(playlistId)
                dispatch(setPlaylistInfo(response.data));
            } catch (error) {
                dispatch(setError(error.message));
            }
        };
    
        fetchPlaylist();
    
        return () => {
          dispatch(resetPlaylistInfo());
        };
    }, [dispatch, playlistId]);



    
  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!playlistInfo) return <p>No playlist data available.</p>;

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
            <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
                <div className="relative mb-2 w-full pt-[56%]">
                    <div className="absolute inset-0">
                        <img
                            src={playlistInfo.firstVideoThumbnail}
                            alt="React Mastery"
                            className="h-full w-full" />
                        <div className="absolute inset-x-0 bottom-0">
                            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                                <div className="relative z-[1]">
                                    <p className="flex justify-between">
                                        <span className="inline-block">Playlist</span>
                                        <span className="inline-block">{playlistInfo.totalVideos} videos</span>
                                    </p>
                                    <p className="text-sm text-gray-200">
                                        {formatViewsCount(playlistInfo.views || 0)} · {getTimeAgo(playlistInfo.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className="mb-1 font-semibold">{playlistInfo.name}</h6>
                <p className="flex text-sm text-gray-200">{playlistInfo.description}</p>
          

                <ChannelPlaylistOwnerInfo
                    ownerId={playlistInfo.ownerId}
                    ownerAvatar={playlistInfo.ownerAvatar}
                    ownerName={playlistInfo.ownerName}
                    ownerUsername={playlistInfo.ownerUsername}
                    ownerTotalSubscribers={playlistInfo.ownerTotalSubscribers}
                />

            </div>


            <ChannelPlaylistVideos playlistId={playlistId} />

        </div>
    </section>
  )
}


export default ChannelPlaylist