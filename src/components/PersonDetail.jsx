import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)

    }, [])
    useEffect(() => {
        // Fetch person details
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`)
            .then(response => response.json())
            .then(response => {
                // console.log(response); 
                setPerson(response);
            })
            .catch(err => console.error(err));

        // Fetch movie credits
        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`)
            .then(response => response.json())
            .then(response => {
                // console.log(response); 
                setMovieCredits(response);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!person || !movieCredits) return <div>Loading...</div>;

    return (
        <div className="bg-black text-white p-2 md:p-16">
            <div className="flex flex-col items-center">
                <img
                    className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover"
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                    alt={person.name}
                />
                <h2 className="text-2xl md:text-4xl font-bold mt-4">{person.name}</h2>
                <p className="mt-2"><strong>Also Known As:</strong> {person.also_known_as.join(', ')}</p>
                <p className="mt-2"><strong>Department:</strong> {person.known_for_department}</p>
                <p className="mt-2"><strong>Birthday:</strong> {person.birthday}</p>
                {person.deathday && <p className="mt-2"><strong>Deathday:</strong> {person.deathday}</p>}
                <p className="mt-2"><strong>Place of Birth:</strong> {person.place_of_birth}</p>
                <p className="mt-2"><strong>Popularity:</strong> {person.popularity}</p>
                <p className="mt-4"><strong>Biography:</strong> {person.biography}</p>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Movie Credits</h3>
                {movieCredits.cast.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                        {movieCredits.cast.map((movie, index) => (
                            <div key={index}>
                                {
                                    isLoading ?
                                        <div className=' inline-block cursor-pointer min-w-[200px] h-[300px] relative rounded-md transition-transform z-0 border border-gray-500
                                      hover:z-50 hover:scale-125 hover:shadow-lg
                                     '>
                                            <SkeletonTheme color="#202020" highlightColor='#444'>
                                                <Skeleton height={300} duration={2} />
                                            </SkeletonTheme>

                                        </div>
                                        :
                                        <Link key={index} to={`/movie/${movie.id}`} className="bg-gray-800 relative inline-block hover:border-gray-400 border border-gray-50 cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className="w-full h-auto object-cover"
                                            />
                                            <div className=" opacity-0 hover:opacity-[1] bg-custom-gradient absolute p-1 bottom-0 h-[290px] flex flex-col w-[100%] justify-end text-white">
                                                <div className="text-white text-lg font-semibold">{movie ? movie.title : ""} </div>

                                                <div className=' text-[.75rem] mb-1'>
                                                    {movie ? movie.character : ""}
                                                    <span className=' float-right'>
                                                        {movie ? movie.release_date : ""} <i className='fas fa-star'></i></span>
                                                </div>
                                                <div className='mb-1 text-[.75rem]'>{movie ? movie.genre_id : ""} </div>

                                            </div>
                                        </Link>
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No movie credits available.</p>
                )}
            </div>
        </div>
    );
};

export default PersonDetail;

{/* <h4 className="text-xl font-bold">{movie.title}</h4>
<p><strong>Character:</strong> {movie.character}</p>
<p><strong>Release Date:</strong> {movie.release_date}</p>
<p><strong>Genres:</strong> {movie.genre_ids.join(', ')}</p> */}







{/* <div className="mt-8">
                <h3 className="text-2xl font-bold">Movie Credits</h3>
                {movieCredits.cast.length > 0 ? (
                    <ul className="mt-4">
                        {movieCredits.cast.map((movie, index) => (
                            <li key={index} className="mt-4">
                                <div className="flex items-start">
                                    <Link to={`/movie/${movie.id}`}>
                                        <img
                                            className="w-16 h-24 object-cover"
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </Link>

                                    <div className="ml-4">
                                        <h4 className="text-xl font-bold">{movie.title}</h4>
                                        <p><strong>Character:</strong> {movie.character}</p>
                                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                                        <p><strong>Overview:</strong> {movie.overview}</p>
                                        <p><strong>Popularity:</strong> {movie.popularity}</p>
                                        <p><strong>Vote Average:</strong> {movie.vote_average}</p>
                                        <p><strong>Vote Count:</strong> {movie.vote_count}</p>
                                        <p><strong>Genres:</strong> {movie.genre_ids.join(', ')}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No movie credits available.</p>
                )}
            </div> */}