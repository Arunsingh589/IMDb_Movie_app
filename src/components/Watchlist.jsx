import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';
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
    const [searchTerm, setSearchTerm] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

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
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const apiKey = '8ba57bb67fe7f61dc132863540f5aa83';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`;

        fetch(url, options)
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
        setSearchTerm(event.target.value); // Convert to lowercase
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (searchTerm.trim()) { // Ensure searchTerm is not empty or just spaces
                navigate(`/movie/${searchResults}`); // Navigate to the search page
                setSearchTerm(""); // Clear the input field
                setSearchResults([]); // Clear search results
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

    return (
        <>
            <nav className="bg-gray-900 text-white px-2 md:px-32 py-5 border-b-2 border-black">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-7 md:space-x-10">
                        <Link to={'/'}> <img src="/imdb.png" alt="IMDb Logo" className="h-10 ml-4 md:ml-8" /></Link>
                        <div className="hidden md:flex items-center space-x-6 ml-4 relative">
                            <h2 className="font-semibold flex items-center space-x-1 relative">
                                <IoMdMenu className='text-3xl hover:bg-gray-600 cursor-pointer' onClick={toggleDropdownMenu} />
                                <span className='text-2xl hover:bg-gray-600 hover:rounded-md px-2 py-1 cursor-pointer'>Menu</span>
                                {isMenuOpen && (
                                    <div className="absolute top-12 left-0 bg-gray-900 bg-opacity-75 w-[170px] h-[160.5px] py-3 z-20 flex flex-col space-y-2 md:space-y-2 ">
                                        <Link to={'/movies/popular'} className="flex items-center space-x-3 text-white hover:bg-gray-500 font-bold py-2 px-4 rounded text-base border-b-2 border-white">
                                            <FaGem /> <span>Popular</span>
                                        </Link>
                                        <Link to={'/movies/top_rated'} className=" text-white flex items-center space-x-3 hover:bg-gray-500 font-bold py-2 px-4 rounded text-base border-b-2 border-white">
                                            <FaAutoprefixer /> <span>Top Rated</span>
                                        </Link>
                                        <Link to={'/movies/upcoming'} className=" text-white flex items-center space-x-3 hover:bg-gray-500 font-bold py-2 px-4 rounded text-base border-b-2 border-white">
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
                                    className="px-2 py-2 text-black rounded w-96 md:w-[490px]"
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
                            <h3 className="font-semibold text-xl">IMDB<span className='text-[#1aa1f5]'>Pro</span></h3>
                            <div className="border-l border-gray-500 h-8 mx-4"></div>
                            <div className="flex items-center space-x-6 md:space-x-12 ml-auto">
                                <h3 className="font-semibold flex items-center space-x-1">
                                    <BsBookmarkPlusFill className='text-2xl' /> <span className='text-xl hover:bg-gray-600 hover:rounded-md px-2 py-1'>Watchlist</span>
                                </h3>
                                <h2 className=" hover:bg-gray-600 hover:rounded-md px-2 py-1 font-semibold text-xl">Sign In</h2>
                                <h2 className=" flex items-center space-x-1">
                                    <span className='text-xl hover:bg-gray-600 hover:rounded-md px-2 py-1'>EN</span> <FaChevronDown className="h-4 w-4" />
                                </h2>
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-6 sm:gap-20'>
                            <button className="text-white md:hidden" onClick={toggleMenu}>
                                {isOpen ? <XMarkIcon className="h-6 w-6" /> : <IoMdMenu className="text-3xl" />}
                            </button>
                            <h3 className="hover:text-gray-400 font-bold flex items-center md:hidden ">
                                Sign In
                            </h3>
                            <button className='bg-[#F5C518] px-2 py-2 rounded-lg md:hidden text-black font-bold'>Use App</button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden flex flex-col space-y-2 mt-2">
                        <Link to={'/movies/popular'} className=" text-white flex items-center hover:bg-gray-500 space-x-1 text-base">
                            <FaGem /> <span>Popular</span>
                        </Link>
                        <Link to={'/movies/top_rated'} className=" text-white flex items-center hover:bg-gray-500 space-x-1  text-base">
                            <FaAutoprefixer /> <span>Top Rated</span>
                        </Link>
                        <Link to={'/movies/upcoming'} className="flex items-center text-white hover:bg-gray-500 space-x-1 text-base ">
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
        </>
    );
};

export default Navbar;
