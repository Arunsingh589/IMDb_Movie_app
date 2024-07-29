import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`)
            .then(res => res.json())
            .then(data => setMovieList(data.results));
    };

    return (
        <div className="container mx-auto px-4 ">
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-6 text-center">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {
                    movieList.map((movie, id) => (
                        <Card
                            movie={movie}
                            key={id}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default MovieList;
