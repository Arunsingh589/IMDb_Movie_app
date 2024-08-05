import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from 'react-icons/io';

const CelebrityGallery = () => {
    const [popular, setPopular] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => setPopular(response.results))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getData();
    }, []);

    const scroll = (scrollOffset) => {
        scrollRef.current.scrollLeft += scrollOffset;
    };

    const handlePersonClick = (personId) => {
        navigate(`/person/${personId}`);
    };

    return (
        <div className="bg-black text-white p-2 md:p-16">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-4xl font-bold">
                    Most popular celebrities <span className="text-yellow-400"></span>
                </h2>
            </div>
            <div className="flex mt-4">
                <h3 className="text-yellow-400 mr-8 font-bold">TOP RISING</h3>
                <h3 className="text-yellow-400 font-bold">BY RANKING</h3>
            </div>
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto mt-4 space-x-4 scrollbar-hide"
                >
                    {popular.map((celebrity, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 cursor-pointer"
                            onClick={() => handlePersonClick(celebrity.id)}
                        >
                            <img
                                className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover"
                                src={`https://image.tmdb.org/t/p/w200${celebrity.profile_path}`}
                                alt={celebrity.name}
                            />
                            <div className="text-center mt-2">
                                <p className="text-lg font-bold">{index + 1} <span className="text-green-400">({celebrity.popularity})</span></p>
                                <p>{celebrity.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll(-200)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 border-2 border-white"
                >
                    <span className="sr-only">Previous</span>
                    <FaArrowLeft className='w-6 h-6 text-white' />
                </button>
                <button
                    onClick={() => scroll(200)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 border-2 border-white"
                >
                    <span className="sr-only">Next</span>
                    <FaArrowRight className='w-6 h-6 text-white' />
                </button>
            </div>
            <div className='flex items-center justify-between'>
                <h3 className="mt-8 text-xl md:text-4xl font-bold text-yellow-400 hidden md:block">What to watch</h3>
                <a href="#" className="text-blue-500 mt-8 md:text-xl items-center flex ">Get more recommendations<IoIosArrowForward /> </a>
            </div>
        </div>
    );
};

export default CelebrityGallery;
