import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const TvShows = () => {
    const [tvShows, setTvShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)

    }, [])

    useEffect(() => {
        const apiKey = '8ba57bb67fe7f61dc132863540f5aa83'; // Replace with your actual API key
        fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => setTvShows(data.results))
            .catch(error => console.error('Error fetching TV shows:', error));
    }, []);

    return (
        <div className="bg-black text-white min-h-screen p-2 md:p-16">
            <h2 className="text-2xl md:text-4xl text-yellow-400 font-bold mb-4 text-center">
                Airing Today
            </h2>
            {
                isLoading ?
                    <div className="grid grid-cols-2 justify-center gap-4">
                        {Array(10).fill().map((_, index) => (
                            <div key={index} className="inline-block cursor-pointer min-w-[200px] h-[300px] relative rounded-md transition-transform z-0 border border-gray-500 hover:z-50 hover:scale-125 hover:shadow-lg">
                                <SkeletonTheme color="#202020" highlightColor="#444">
                                    <Skeleton height={300} duration={2} />
                                </SkeletonTheme>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="bg-black text-white p-2 md:pl-16 mt-8 cursor-pointer mb-8">

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                            {tvShows.map(tv => (
                                <Link to={`/tv/${tv.id}`} key={tv.id} className="bg-gray-800 relative inline-block hover:border-gray-400 border border-gray-50 cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                        alt={tv.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="opacity-0 hover:opacity-[1] bg-custom-gradient absolute p-1 bottom-0 h-[290px] flex flex-col w-[100%] justify-end text-white">
                                        <div className="text-white text-[10px] md:text-lg font-semibold">{tv ? tv.name : ""} </div>

                                        <div className='text-[.45rem] md:text-[.75rem] mb-1'>
                                            {tv ? tv.first_air_date : ""}
                                            <span className=' float-right'>
                                                {tv ? tv.vote_average : ""} <i className='fas fa-star'></i></span>
                                        </div>
                                        <div className='mb-1 text-[.40rem] md:text-[.75rem]'>{tv ? tv.overview.slice(0, 118) + "...." : ""} </div>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div >

            }
        </div>

    );
};

export default TvShows;
