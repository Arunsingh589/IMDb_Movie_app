import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TVSeriesVideos = () => {
    const { seriesId, seasonNumber } = useParams();
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = '8ba57bb67fe7f61dc132863540f5aa83';
        const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/videos?api_key=${apiKey}&language=en-US`;

        const fetchVideos = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    setVideos(data.results || []);
                } else {
                    throw new Error(data.status_message || 'Failed to fetch videos');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, [seriesId, seasonNumber]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4 container mx-auto">
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos.map(video => (
                        <div key={video.id} className="rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                className="w-full h-64"
                                src={`https://www.youtube.com/embed/${video.key}`}
                                title={video.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="p-2">
                                <h3 className="text-lg font-bold">{video.name}</h3>
                                <p className="text-sm text-gray-400">{video.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No videos found for this season.</p>
            )}
        </div>
    );
};

export default TVSeriesVideos;
