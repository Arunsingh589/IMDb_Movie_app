import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { mobileNavigation } from './Navigation';
import { FaSearch } from 'react-icons/fa';

const MobileNavigation = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation()



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
        const apiKey = '8ba57bb67fe7f61dc132863540f5aa83'; // Replace with your actual API key
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

    const handleSearchIconClick = () => {
        setIsSearchVisible(true);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
            setSearchResults([]);
            // setIsSearchVisible(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
        setSearchTerm('');
        setSearchResults([]);
        setIsSearchVisible(false);
    };

    return (
        <>
            {
                location.pathname === '/search/:searchTerm' &&
                <>
                    {isSearchVisible && (
                        <div className='md:hidden fixed top-20 left-0 right-0 p-2 bg-black bg-opacity-90 z-50'>
                            <form onSubmit={handleSearchSubmit}>
                                <div className='relative'>
                                    <input
                                        type='text'
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className='w-full p-2 rounded text-black'
                                        placeholder='Search...'
                                    />
                                    <FaSearch className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
                                </div>
                            </form>
                            {searchResults.length > 0 && (
                                <div className='mt-2 bg-white text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto'>
                                    {searchResults.map((movie) => (
                                        <button
                                            key={movie.id}
                                            onClick={() => handleMovieClick(movie.id)}
                                            className='block px-4 py-2 hover:bg-gray-200 w-full text-left'
                                        >
                                            {movie.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>

            }


            <section className='lg:hidden h-14 bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-40'>
                <div className='flex items-center justify-between h-full text-neutral-400'>
                    {mobileNavigation.map((nav) => (
                        <NavLink
                            key={nav.label + "mobilenavigation"}
                            to={nav.href}
                            className={({ isActive }) => `px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}
                            onClick={nav.label === 'search' ? handleSearchIconClick : null}
                        >
                            <div className='text-2xl'>
                                {nav.icon}
                            </div>
                            <p className='text-sm'>{nav.label}</p>
                        </NavLink>
                    ))}
                </div>
            </section>
        </>
    );
};

export default MobileNavigation;
