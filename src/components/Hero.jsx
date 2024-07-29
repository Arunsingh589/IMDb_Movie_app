import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaStar } from 'react-icons/fa';
import MovieList from './MovieList';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results))
    }, []);

    return (
        <div className='w-full'>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    popularMovies.map((movie, id) => (
                        <Link to={`/movie/${movie.id}`} key={id} className="relative inline-block w-full h-[450px] md:h-[650px]">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-20 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end items-start">
                                <div className='text-white font-black text-lg md:text-4xl lg:text-6xl mb-2 text-left'>
                                    {movie ? movie.original_title : ""}
                                </div>
                                <div className='text-white text-sm md:text-xl lg:text-3xl font-semibold mb-2 md:mb-4 flex items-center'>
                                    {movie ? movie.release_date : ""}
                                    <span className='ml-4 md:ml-12 flex items-center'>
                                        {movie ? movie.vote_average : ""}
                                        <FaStar className="ml-1 md:ml-2" />
                                    </span>
                                </div>
                                <div className='text-white italic text-xs md:text-base lg:text-lg mb-10 md:mb-2 text-left w-full md:w-3/4 lg:w-1/2'>
                                    {movie ? movie.overview : ""}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Carousel>
            <MovieList />
        </div>
    );
}

export default Hero;
