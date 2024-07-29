import React, { useEffect, useState } from 'react'
import { BsBookmarkPlus } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { VscDebugStart } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const MovieCard = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [allContent, setAllContent] = useState([]);

    useEffect(() => {
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        const fetchAllContent = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`, options);
            const data = await response.json();
            setAllContent(data.results);
        };

        const fetchMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`, options);
            const data = await response.json();
            setMovies(data.results);
        };

        const fetchTvShows = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US`, options);
            const data = await response.json();
            setTvShows(data.results);
        };

        fetchAllContent();
        fetchMovies();
        fetchTvShows();
    }, []);

    const renderContent = () => {
        let content = [];
        let routePrefix = '';
        if (activeCategory === 'all') {
            content = allContent;
            routePrefix = (item) => item.media_type === 'movie' ? '/movie/' : '/tv/';
        } else if (activeCategory === 'movies') {
            content = movies;
            routePrefix = '/movie/';
        } else if (activeCategory === 'tv') {
            content = tvShows;
            routePrefix = '/tv/';
        }
    }
    return (
        <div className="bg-black text-white min-h-screen p-2 md:p-16">
            <div className="flex justify-center space-x-4 mb-8">
                <button onClick={() => setActiveCategory('all')} className={`text-white ${activeCategory === 'all' && 'text-blue-500 border-b-2 border-blue-500'}`}>ALL</button>
                <button onClick={() => setActiveCategory('movies')} className={`text-white ${activeCategory === 'movies' && 'text-blue-500 border-b-2 border-blue-500'}`}>MOVIES</button>
                <button onClick={() => setActiveCategory('tv')} className={`text-white ${activeCategory === 'tv' && 'text-blue-500 border-b-2 border-blue-500'}`}>TV SHOWS</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                {
                    content.map(movie => (
                        <Link to={`${routePrefix}${movie.id}`} key={movie.id} className="flex-shrink-0 relative  w-48 bg-gray-900">
                            <BsBookmarkPlus className='absolute w-10 h-10' />
                            <img
                                className="w-48 h-64 object-cover"
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <div className="mt-2 text-center  items-center">
                                <p className="text-yellow-400 flex items-center gap-1 p-2"> <FaStar /> {movie.vote_average} <span className='text-blue-500 justify-between'><CiStar /></span></p>
                                <p className="font-bold flex text-sm p-2">{movie.name}</p>
                                <button className="bg-gray-800 text-white px-6 py-2 text-xl mt-4 rounded">Watch options</button>
                                <button className="flex items-center tex-xl font-bold gap-2 text-white px-4 py-1 mt-4 "><VscDebugStart />Trailer <MdErrorOutline /> </button>
                            </div>
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}

export default MovieCard
