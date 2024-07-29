import React, { useState, useEffect } from 'react';

const MovieVideos = ({ movieId = 550 }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = '8ba57bb67fe7f61dc132863540f5aa83'; // Replace with your actual API key

    useEffect(() => {
        const fetchVideos = async () => {
            const options = {
                method: 'GET',
                headers: { accept: 'application/json' },
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${apiKey}`, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched videos:', data);
                setVideos(data.results);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [movieId, apiKey]);

    if (loading) {
        return <div className="text-center py-4">Loading videos...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;
    }

    if (videos.length === 0) {
        return <div className="text-center py-4">No videos found for this movie.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Movie {movieId} Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videos.map((video) => (
                    <div key={video.id} className="border p-4 rounded shadow">
                        <h3 className="text-xl mb-2">{video.name}</h3>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${video.key}`}
                                title={video.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieVideos;
