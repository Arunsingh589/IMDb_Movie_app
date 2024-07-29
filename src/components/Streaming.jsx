import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { BsBookmarkPlus } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { VscDebugStart } from 'react-icons/vsc';
import 'tailwindcss/tailwind.css';

const apiKey = '8ba57bb67fe7f61dc132863540f5aa83';

const StreamingSection = () => {
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
        } else if (activeCategory === 'movies') {
            content = movies;
            routePrefix = '/movie/';
        } else if (activeCategory === 'tv') {
            content = tvShows;
            routePrefix = '/tv/';
        }

        return content.map(item => {

            const prefix = activeCategory === 'all' ? (item.media_type === 'movie' ? '/movie/' : '/tv/') : routePrefix;
            return (
                <Link to={`${prefix}${item.id}`} key={item.id}>
                    <MovieCard
                        title={item.title || item.name}
                        rating={item.vote_average}
                        imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        platform={item.media_type}
                    />
                </Link>
            );
        });
    };

    return (
        <div className="bg-black text-white min-h-screen p-2 md:p-16">
            <header className="flex flex-col mb-8">
                <h1 className="text-2xl md:text-4xl font-bold text-yellow-500 mb-8">Explore what's streaming</h1>
                <div className="flex justify-start space-x-4 overflow-x-auto w-full">
                    {/* Platform icons */}
                    <button className="p-2 rounded-full border-yellow-500 border-2 w-16 h-16  items-center justify-center hidden md:block">All</button>
                    <img src="/prime.jpg" alt="Prime Video" className="w-16 h-16 rounded-full border-gray-500 border-2" />
                    <img src="/netflix.jpeg" alt="Netflix" className="w-16 h-16 rounded-full border-gray-500 border-2" />
                    <img src="/disney.webp" alt="Disney+ Hotstar" className="w-16 h-16 rounded-full border-gray-500 border-2" />
                    <img src="/mx.jpeg" alt="MX Player" className="w-16 h-16 rounded-full border-gray-500 border-2" />
                    <img src="/sony.jpeg" alt="Sony LIV" className="w-16 h-16 rounded-full border-gray-500 border-2" />
                    <button className="rounded-full border-gray-500 border-2 w-16 h-16 hidden md:block items-center justify-center">E</button>
                    <button className="p-2 rounded-full border-gray-500 border-2 w-16 h-16 hidden md:block items-center justify-center">V</button>
                </div>
            </header>
            <div className="flex justify-center space-x-4 mb-8">
                <button onClick={() => setActiveCategory('all')} className={`text-white ${activeCategory === 'all' && 'text-blue-500 border-b-2 border-blue-500'}`}>ALL</button>
                <button onClick={() => setActiveCategory('movies')} className={`text-white ${activeCategory === 'movies' && 'text-blue-500 border-b-2 border-blue-500'}`}>MOVIES</button>
                <button onClick={() => setActiveCategory('tv')} className={`text-white ${activeCategory === 'tv' && 'text-blue-500 border-b-2 border-blue-500'}`}>TV SHOWS</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                {renderContent()}
            </div>
        </div>
    );
};

const MovieCard = ({ title, rating, imageUrl, platform }) => {
    return (
        <div className="overflow-x-auto mt-4 flex space-x-4">
            <div className="flex-shrink-0 relative w-48 min-h-[470px] bg-gray-900">
                <BsBookmarkPlus className='absolute w-10 h-10' />
                <img
                    className="w-48 h-64 object-cover"
                    src={imageUrl}
                    alt={title}
                />
                <div className="mt-2 text-center">
                    <p className="text-yellow-400 flex items-center gap-1 p-2">
                        <FaStar />{rating} <span className='text-blue-500'><CiStar /></span>
                    </p>
                    <p className="font-bold text-sm p-2">{title}</p>
                    <button className="bg-gray-800 text-white px-6 py-2 text-xl mt-3 rounded">Watch options</button>
                    <button className="flex items-center text-xl font-bold gap-2 text-white px-4 py-1 mt-4">
                        <VscDebugStart />Trailer <MdErrorOutline />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StreamingSection;
