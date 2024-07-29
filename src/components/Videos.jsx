import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { VscDebugStart } from 'react-icons/vsc';
import { MdErrorOutline } from "react-icons/md";
import { BsBookmarkPlus } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io'



const Videos = () => {
    const [tv, setTv] = useState([]);
    const scrollRef = useRef(null);




    const getData = () => {
        fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => setTv(data.results))
    }

    useEffect(() => {

        getData();

    }, [])
    const scroll = (scrollOffset) => {
        scrollRef.current.scrollLeft += scrollOffset;
    };

    return (
        <div className="bg-black text-white p-2 md:pl-16 mt-8 cursor-pointer">
            <h2 className="text-2xl md:text-4xl text-yellow-400 font-bold">
                Exclusive Videos <span className="text-yellow-400"></span>
            </h2>
            <div className="flex  items-center mt-12">
                <h2 className='text-2xl md:text-4xl font-bold'>IMDb Originals</h2>

                {/* <IoIosArrowForward className='text-2xl md:text-4xl mt-2 hover:text-yellow-400' /> */}
            </div>
            <p className='text-gray-400 text-xs md:text-xl mt-1 md:mt-2'>Celebrity interview, trending entertainment stories, and expert analysis</p>
            <div className='relative'>
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    // transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    <div
                        ref={scrollRef}
                        className="overflow-x-auto mt-4 flex space-x-4 scrollbar-hide"
                    >
                        {tv.map((movie) => (
                            <Link to={`/tv/${movie.id}`} key={movie.id} className="flex-shrink-0 relative  w-48 bg-gray-900">

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
                        ))}
                        <button
                            onClick={() => scroll(-200)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-2 md:px-3 md:py-5 bg-black bg-opacity-50 border border-white"
                        >
                            <span className="sr-only">Previous</span>

                            <FaArrowLeft className='w-6 h-6 text-white' />
                        </button>
                        <button
                            onClick={() => scroll(200)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-2 md:px-3 md:py-5  bg-black bg-opacity-50 border border-white"
                        >
                            <span className="sr-only">Next</span>

                            <FaArrowRight className='w-6 h-6 text-white' />
                        </button>
                    </div>

                </Carousel>

            </div>
        </div>
    )
}

export default Videos
