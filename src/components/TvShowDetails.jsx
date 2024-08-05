import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlay from './VideoList';
import Footer from './Footer';
import SimilarTvShow from './Simliar/SimilarTvShow';
import RecomendationTvShow from './Simliar/RecomendationTvShow';

const TvShowDetail = () => {
    const [currentMovieDetails, setCurrentMovieDetails] = useState([]);
    const { id } = useParams();
    const [cast, setCast] = useState([]);
    const navigate = useNavigate();
    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [currentTvId, setCurrentTvId] = useState(null);



    useEffect(() => {
        getData();
        getCastData();
        window.scrollTo(0, 0);
    }, [id]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`)
            .then(res => res.json())
            .then(data => setCurrentMovieDetails(data));
    };
    const getCastData = () => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`)
            .then(res => res.json())
            .then(data => setCast(data.cast.filter(actor => actor.profile_path))); // Filter out cast without images
    };

    const handlePersonClick = (personId) => {
        navigate(`/person/${personId}`);
    };

    const handlePlayVideo = async (tvId) => {
        setCurrentTvId(tvId);
        const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`);
        const data = await response.json();
        const video = data.results.find(v => v.site === 'YouTube'); // Assuming you want YouTube videos
        if (video) {
            setVideoId(video.key);
            setPlayVideo(true);
        }
    };


    return (
        <div>
            {/* Hidden on small screens */}
            <div className='hidden lg:flex items-center relative w-full flex-col'>
                <div className='w-[80%]'>
                    <img
                        className='w-full h-[300px] sm:h-[400px] md:h-[500px] object-center'
                        src={`https://image.tmdb.org/t/p/original${currentMovieDetails ? currentMovieDetails.backdrop_path : ""}`}
                        alt="Movie Backdrop"
                    />
                </div>
                <div className='flex items-center w-[75%] relative bottom-[225px]'>
                    <div className='mr-8 inline-block'>
                        <img className="max-w-[300px] inline-block rounded-lg object-cover shadow-custom" src={`https://image.tmdb.org/t/p/original${currentMovieDetails ? currentMovieDetails.poster_path : ""}`} alt="Movie Poster" />
                        <button
                            onClick={() => handlePlayVideo(id)}
                            className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l
                 from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
                    </div>
                    <div className='flex flex-col text-white h-[450px] justify-between'>
                        <div className='mb-2 text-shadow-custom'>
                            <div className="font-bold text-[3rem]">{currentMovieDetails ? currentMovieDetails.name : ""}</div>
                            <div className="font-semibold">{currentMovieDetails ? currentMovieDetails.tagline : ""}</div>
                            <div className="mb-1 font-sans font-semibold">
                                {currentMovieDetails ? currentMovieDetails.vote_average : ""} <i className="fas fa-star" />
                                <span className="ml-4">{currentMovieDetails ? "(" + currentMovieDetails.vote_count + ") votes" : ""}</span>
                            </div>
                            <div className="font-sans font-semibold">{currentMovieDetails ? currentMovieDetails.runtime + " mins" : ""}</div>
                            <div className="font-sans font-semibold">{currentMovieDetails ? "Release date: " + currentMovieDetails.air_date : ""}</div>
                            <div className="mt-4">
                                {currentMovieDetails && currentMovieDetails.genres
                                    ? currentMovieDetails.genres.map(genre => (
                                        <span key={genre.id} className="p-2 border-2 border-white rounded-[20px] mr-4" id={genre.id}>{genre.name}</span>
                                    ))
                                    : ""}
                            </div>
                        </div>
                        <div className="mt-8 ml-4 flex-[0.8]">
                            <div className="flex relative items-center text-2xl mb-5 font-bold">Synopsis</div>
                            <div className='font-semibold'>{currentMovieDetails ? currentMovieDetails.overview : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="flex relative w-[75%] justify-between no-underline">
                    <div className="text-3xl text-white font-bold">Useful Links</div>
                    {currentMovieDetails && currentMovieDetails.homepage && <a href={currentMovieDetails.homepage} target="_blank"><p><span
                        className="flex justify-center items-center p-2 bg-red-500 cursor-pointer w-[150px] text-black font-bold rounded-[20px]">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>}
                    {currentMovieDetails && currentMovieDetails.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetails.imdb_id} target="_blank"><p><span
                        className="flex justify-center items-center bg-yellow-400 p-2 cursor-pointer w-[150px] text-black font-bold rounded-[20px]">IMDb <i className="newTab fas fa-external-link-alt"></i></span></p></a>}
                </div>
                <div className="text-3xl text-white mt-20 font-bold">Production companies</div>
                <div className="flex w-[85%] justify-center items-end mb-8">
                    {currentMovieDetails && currentMovieDetails.production_companies && currentMovieDetails.production_companies.map(company => (
                        company.logo_path &&
                        <span key={company.id} className="flex items-center justify-center flex-col">
                            <img className="w-[200px] m-8" src={"https://image.tmdb.org/t/p/original" + company.logo_path} alt={company.name} />
                            <span className='text-white font-semibold'>{company.name}</span>
                        </span>
                    ))}
                </div>
                <div className="text-3xl text-white mt-20 font-bold">Cast</div>
                <div className="grid grid-cols-6 mb-8">
                    {cast.map(actor => (
                        <span key={actor.id} onClick={() => handlePersonClick(actor.id)} className="flex items-center justify-center flex-col">
                            <img className="w-[100px] m-8 rounded-full" src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
                            <span className='text-white font-semibold'>{actor.name}</span>
                            {/* <span className='text-white'>{actor.character}</span> */}
                        </span>
                    ))}
                </div>
            </div>

            {/* Visible on small screens */}
            <div className='lg:hidden flex items-center relative w-full flex-col'>
                <div className='relative w-full'>
                    <img
                        className='w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center'
                        src={`https://image.tmdb.org/t/p/original${currentMovieDetails.backdrop_path}`}
                        alt="Movie Backdrop"
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12'>
                        <div className='text-white mb-24 md:mb-0'>
                            <div className="font-bold text-[1.5rem] sm:text-[3rem]">{currentMovieDetails.name}</div>
                            <div className="font-semibold">{currentMovieDetails.tagline}</div>
                            <div className="mb-1 font-sans font-semibold">
                                {currentMovieDetails.vote_average} <i className="fas fa-star" />
                                <span className="ml-4">{currentMovieDetails.vote_count ? `(${currentMovieDetails.vote_count} votes)` : ""}</span>
                            </div>
                            <div className="font-sans font-semibold">{currentMovieDetails.runtime ? `${currentMovieDetails.runtime} mins` : ""}</div>
                            <div className="font-sans font-semibold">{currentMovieDetails.release_date ? `Release date: ${currentMovieDetails.release_date}` : ""}</div>
                            <div className="mt-4 flex">
                                {currentMovieDetails.genres && currentMovieDetails.genres.map(genre => (
                                    <span key={genre.id} className="px-1 text-[14px] py-1 border-2 border-white rounded-[20px] mr-4">{genre.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative w-[80%] flex flex-col lg:flex-row items-start lg:items-center mt-[-50px] lg:mt-[-200px]'>
                    <img
                        className='w-[40%] lg:w-[20%] lg:mr-8  rounded-lg object-cover shadow-custom'
                        src={`https://image.tmdb.org/t/p/original${currentMovieDetails.poster_path}`}
                        alt="Movie Poster"
                    />
                    <button
                        onClick={() => handlePlayVideo(id)}
                        className='mt-3 w-[41%] py-2 px-4 text-center bg-white text-black rounded font-bold text-sm hover:bg-gradient-to-l
                 from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>

                    <div className='text-white mt-4 lg:mt-56'>
                        <div className='text-shadow-custom'>
                            <div className="text-2xl font-bold mb-2">Synopsis</div>
                            <div className='font-semibold'>{currentMovieDetails.overview}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-between w-[75%] mt-8">
                    <div className="text-3xl mb-4 lg:mb-0 text-white">Useful Links</div>
                    <div className="flex space-x-4">
                        {currentMovieDetails.homepage && (
                            <a href={currentMovieDetails.homepage} target="_blank" rel="noopener noreferrer">
                                <span className="flex justify-center items-center p-4 bg-red-500 cursor-pointer w-[150px] text-black font-bold rounded-[20px]">Homepage <i className="newTab fas fa-external-link-alt"></i></span>
                            </a>
                        )}
                        {currentMovieDetails.imdb_id && (
                            <a href={`https://www.imdb.com/title/${currentMovieDetails.imdb_id}`} target="_blank" rel="noopener noreferrer">
                                <span className="flex justify-center items-center bg-yellow-400 p-4 cursor-pointer w-[150px] text-black font-bold rounded-[20px]">IMDb <i className="newTab fas fa-external-link-alt"></i></span>
                            </a>
                        )}
                    </div>
                </div>
                <div className="text-3xl text-white mt-8">Production Companies</div>
                <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 justify-center items-center w-[85%] mb-16">
                    {currentMovieDetails.production_companies && currentMovieDetails.production_companies.map(company => (
                        company.logo_path && (
                            <span key={company.id} className="flex items-center justify-center flex-col mt-4">
                                <img className="w-[70px] sm:w-[150px] md:w-[200px]" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />
                                <span className='text-white mt-2'>{company.name}</span>
                            </span>
                        )
                    ))}
                </div>
                <div className="text-xl text-white mt-8">Cast</div>
                <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-4 justify-center items-center w-[85%] mb-16">
                    {cast.map(actor => (
                        <span key={actor.id} onClick={() => handlePersonClick(actor.id)} className="flex items-center justify-center flex-col mt-4">
                            <img className="w-[70px] sm:w-[150px] md:w-[200px] rounded-full" src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
                            <span className='text-[10px] text-white mt-2'>{actor.name}</span>
                            {/* <span className='text-[10px] text-white mt-1'>{actor.character}</span> */}
                        </span>
                    ))}
                </div>
            </div>
            {playVideo && (
                <VideoPlay data={{ id: currentTvId }} close={() => setPlayVideo(false)} media_type="tv" />
            )}
            <SimilarTvShow />
            <RecomendationTvShow />
            <Footer />
        </div>
    );
};

export default TvShowDetail;
