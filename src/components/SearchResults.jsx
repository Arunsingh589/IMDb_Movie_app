import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SearchResults = () => {
    const { searchTerm } = useParams();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    useEffect(() => {
        const apiKey = '8ba57bb67fe7f61dc132863540f5aa83';
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`;
        const personUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`;
        const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`;

        const fetchResults = async () => {
            try {
                const [movieResponse, personResponse, tvResponse] = await Promise.all([
                    fetch(movieUrl).then(response => response.json()),
                    fetch(personUrl).then(response => response.json()),
                    fetch(tvUrl).then(response => response.json())
                ]);

                const combinedResults = [
                    ...(movieResponse.results || []).map(movie => ({ ...movie, type: 'movie' })),
                    ...(personResponse.results || []).map(person => ({ ...person, type: 'person' })),
                    ...(tvResponse.results || []).map(tv => ({ ...tv, type: 'tv' }))
                ];

                setResults(combinedResults);
            } catch (err) {
                console.error(err);
            }
        };

        fetchResults();
    }, [searchTerm]);

    return (
        <div className="p-4 container mx-auto">
            {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {results.map(result => (
                        <div key={result.id} className="rounded-lg overflow-hidden shadow-lg">
                            {
                                isLoading ?
                                    <div className='inline-block cursor-pointer min-w-[200px] h-[300px] relative rounded-md transition-transform z-0 border border-gray-500
                                    hover:z-50 hover:scale-125 hover:shadow-lg'>
                                        <SkeletonTheme color="#202020" highlightColor='#444'>
                                            <Skeleton height={300} duration={2} />
                                        </SkeletonTheme>
                                    </div>
                                    :
                                    <Link
                                        to={
                                            result.type === 'movie' ? `/movie/${result.id}`
                                                : result.type === 'person' ? `/person/${result.id}`
                                                    : `/tv/${result.id}`
                                        }
                                        className="bg-gray-800 w-full h-[400px] relative inline-block hover:border-gray-400 border border-gray-50 cursor-pointer rounded-lg 
                                        overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                        <img
                                            src={
                                                result.type === 'movie' ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                                    : result.type === 'person' ? `https://image.tmdb.org/t/p/w500${result.profile_path}`
                                                        : `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                            }
                                            alt={
                                                result.type === 'movie' ? result.title
                                                    : result.type === 'person' ? result.name
                                                        : result.name
                                            }
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="opacity-0 hover:opacity-[1] bg-custom-gradient absolute p-1 bottom-0 h-[290px] flex flex-col w-[100%] justify-end text-white">
                                            <div className="text-white text-lg font-semibold">
                                                {result.type === 'movie' ? result.original_title
                                                    : result.type === 'person' ? result.name
                                                        : result.name}
                                            </div>
                                            {result.type === 'movie' && (
                                                <>
                                                    <div className='text-[.75rem] mb-1'>
                                                        {result.release_date}
                                                        <span className='float-right'>
                                                            {result.vote_average} <i className='fas fa-star'></i>
                                                        </span>
                                                    </div>
                                                    <div className='mb-1 text-[.75rem]'>{result.overview.slice(0, 118) + "...."}</div>
                                                </>
                                            )}
                                            {result.type === 'tv' && (
                                                <>
                                                    <div className='text-[.75rem] mb-1'>
                                                        {result.first_air_date}
                                                        <span className='float-right'>
                                                            {result.vote_average} <i className='fas fa-star'></i>
                                                        </span>
                                                    </div>
                                                    <div className='mb-1 text-[.75rem]'>{result.overview.slice(0, 118) + "...."}</div>
                                                </>
                                            )}
                                        </div>
                                    </Link>
                            }
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No results found</p>
            )}
        </div>
    );
};

export default SearchResults;
