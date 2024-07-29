import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { IoMdMenu } from 'react-icons/io';
import { FaAutoprefixer, FaChevronDown, FaGem, FaSearch } from 'react-icons/fa';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import { MdLanguage, MdUpcoming } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { PiSignInBold } from 'react-icons/pi';
import { GiCelebrationFire } from 'react-icons/gi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm) {
            const delayDebounceFn = setTimeout(() => {
                getData(searchTerm);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const getData = (query) => {
        const apiKey = '8ba57bb67fe7f61dc132863540f5aa83';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    setSearchResults(data.results);
                } else {
                    console.error('No results found');
                    setSearchResults([]);
                }
            })
            .catch(err => {
                console.error(err);
                setSearchResults([]);
            });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (searchTerm.trim()) {
                navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
                setSearchTerm("");
                setSearchResults([]);
            }
        }
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
        setSearchTerm("");
        setSearchResults([]);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleUserClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsUserMenuOpen(false);
    };

    const handleCreateAccount = () => {
        setIsUserMenuOpen(false);
        navigate('/signuppage');
    };

    return (
        <nav className="bg-gray-900 sticky top-0 left-0 z-10 text-white m-0 p-0">
            <div className="flex items-center justify-between border-b-2 mx-auto border-black container py-5">
                <div className="flex items-center mx-auto">
                    <Link to={'/'} className='md:w-20'><img src="/imdb.png" alt="IMDb Logo" className="h-6 md:h-10 ml-2 md:ml-8" /></Link>
                    <div className="hidden md:flex items-center space-x-6 ml-4 relative">
                        <h2 className="font-semibold flex items-center sm:ml-6 lg:ml-16 relative">
                            <IoMdMenu className='text-3xl hover:bg-gray-600 cursor-pointer' onClick={toggleDropdownMenu} />
                            <span className='text-2xl hover:bg-gray-600 hover:rounded-md px-2 py-1 cursor-pointer'>Menu</span>
                            {isMenuOpen && (
                                <div className="absolute top-12 left-0 bg-gray-900 bg-opacity-75 w-[170px] h-[160.5px] py-3 z-20 flex flex-col space-y-2 md:space-y-2">
                                    <Link to={'/movies/popular'} className="flex items-center space-x-3 text-white hover:bg-gray-500 font-bold py-2 px-4 rounded text-base border-b-2 border-white">
                                        <FaGem /> <span>Popular</span>
                                    </Link>
                                    <Link to={'/movies/top_rated'} className="text-white flex items-center space-x-3 hover:bg-gray-500 font-bold py-2 px-4 rounded text-base border-b-2 border-white">
                                        <FaAutoprefixer /> <span>Top Rated</span>
                                    </Link>
                                    <Link to={'/movies/upcoming'} className="text-white flex items-center space-x-3 hover:bg-gray-500 font-bold py-2 px-4 rounded text-base border-b-2 border-white">
                                        <MdUpcoming /> <span>Upcoming</span>
                                    </Link>
                                </div>
                            )}
                        </h2>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Celebs | Search IMDb"
                                className="px-2 py-2 text-black rounded w-96 md:w-[220px]  2xl:w-[400px]"
                            />
                            <FaSearch className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 bg-white text-black rounded shadow-lg z-20 max-h-60 overflow-y-auto">
                                    {searchResults.map((movie) => (
                                        <button
                                            key={movie.id}
                                            onClick={() => handleMovieClick(movie.id)}
                                            className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                        >
                                            {movie.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <h3 className="font-semibold text-xl hidden xl:block">IMDB<span className='text-[#1aa1f5]'>Pro</span></h3>
                        <div className="border-l border-gray-500 h-8 mx-4 hidden xl:block"></div>
                        <div className="flex items-center space-x-6 lg:space-x-12 ml-auto">
                            <h3 className="font-semibold flex items-center space-x-1 ">
                                <BsBookmarkPlusFill className='text-2xl hidden xl:block' /> <span className='text-xl hover:bg-gray-600 hidden xl:block hover:rounded-md px-2 py-1'>Watchlist</span>
                            </h3>
                            {user ? (
                                <div className="relative">
                                    <span
                                        onClick={handleUserClick}
                                        className="hover:bg-gray-600 hover:rounded-md  font-semibold text-lg lg:text-xl cursor-pointer"
                                    >
                                        {user.email}
                                    </span>
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-20">
                                            <button
                                                onClick={handleCreateAccount}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                            >
                                                Create New Account
                                            </button>
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to={'/signuppage'} className="hover:bg-gray-600 hover:rounded-md px-2 py-1 font-semibold text-xl">Sign In</Link>
                            )}
                            <h2 className="flex items-center space-x-1">
                                <span className='text-xl hover:bg-gray-600 hover:rounded-md px-2 py-1 hidden xl:block'>EN</span> <FaChevronDown className="h-4 w-4 hidden xl:block" />
                            </h2>
                        </div>
                    </div>
                    <div className='flex items-center justify-center px-2 gap-2 sm:gap-20'>
                        <button className="text-white md:hidden" onClick={toggleMenu}>
                            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <IoMdMenu className="text-3xl" />}
                        </button>
                        <h3 className="hover:text-gray-400 font-bold flex items-center md:hidden ">
                            {user ? (
                                <div className="relative">
                                    <span
                                        onClick={handleUserClick}
                                        className="hover:bg-gray-600 hover:rounded-md px-1 py-1 font-semibold text-sm md:text-xl cursor-pointer"
                                    >
                                        {user.email}
                                    </span>
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-20">
                                            <button
                                                onClick={handleCreateAccount}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                            >
                                                Create New Account
                                            </button>
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to={'/signuppage'} className="hover:bg-gray-600 hover:rounded-md px-2 py-1 font-semibold text-xl">Sign In</Link>
                            )}
                        </h3>
                        <button className='bg-[#F5C518] px-1 py-1 text-sm rounded-lg md:hidden text-black font-bold'>Use App</button>
                        {/* https://play.google.com/store/apps/details?id=com.imdb.mobile&pcampaignid=web_share */}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-2 px-2 mt-2">
                    <Link to={'/movies/popular'} className="text-white flex items-center hover:bg-gray-500 space-x-1 text-base">
                        <FaGem /> <span>Popular</span>
                    </Link>
                    <Link to={'/movies/top_rated'} className="text-white flex items-center hover:bg-gray-500 space-x-1 text-base">
                        <FaAutoprefixer /> <span>Top Rated</span>
                    </Link>
                    <Link to={'/movies/upcoming'} className="flex items-center text-white hover:bg-gray-500 space-x-1 text-base">
                        <MdUpcoming /> <span>Upcoming</span>
                    </Link>
                    <h3 className="hover:text-gray-400 flex items-center space-x-1 text-base">
                        <GiCelebrationFire className='text-xl' /> <span>Celebs</span>
                    </h3>
                    <h3 className="hover:text-gray-400 flex items-center space-x-1 text-base">
                        <BsBookmarkPlusFill className='text-xl' /> <span>Watchlist</span>
                    </h3>
                    <h3 className="hover:text-gray-400 flex items-center space-x-1 text-base">
                        <PiSignInBold className='text-xl' /> <span>Sign In</span>
                    </h3>
                    <h3 className="hover:text-gray-400 flex items-center space-x-1 text-base">
                        <MdLanguage className='text-xl' /> <span>EN</span>
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Search IMDb"
                            className="px-2 py-1 rounded w-full text-black"
                        />
                        <FaSearch className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white text-black rounded shadow-lg z-20 max-h-60 overflow-y-auto">
                                {searchResults.map((movie) => (
                                    <button
                                        key={movie.id}
                                        onClick={() => handleMovieClick(movie.id)}
                                        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                    >
                                        {movie.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
