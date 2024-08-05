import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const VideoPlay = ({ data, close, media_type }) => {
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${data.id}/videos?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`);
                const result = await response.json();
                const video = result.results.find(v => v.site === 'YouTube');
                if (video) {
                    setVideoId(video.key);
                }
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        fetchVideoDetails();
    }, [data.id, media_type]);

    return (
        <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
                <button onClick={close} className='absolute -right-1 -top-6 text-3xl z-50'>
                    <IoClose className='text-white' />
                </button>

                {videoId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className='w-full h-full'
                        allow="autoplay; encrypted-media"
                        title="Video Player"
                        frameBorder="0"
                    />
                ) : (
                    <div className='flex justify-center items-center w-full h-full text-white'>
                        Loading video...
                    </div>
                )}
            </div>
        </section>
    );
};

export default VideoPlay;
