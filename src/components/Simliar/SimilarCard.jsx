import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';


const SimilarCard = ({ tv }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)

    }, [])

    return (
        <div>
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
                    <Link to={`/tv/${tv.id}`} className="bg-gray-800 relative inline-block hover:border-gray-400 border border-gray-50 cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-110">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                            alt={tv.title}
                            className="w-full h-auto object-cover"
                        />
                        <div className=" opacity-0 hover:opacity-[1] bg-custom-gradient absolute p-1 bottom-0 h-[290px] flex flex-col w-[100%] justify-end text-white">
                            <div className="text-white text-[10px] md:text-lg font-semibold">{tv ? tv.original_title : ""} </div>

                            <div className='text-[.45rem] md:text-[.75rem] mb-1'>
                                {tv ? tv.release_date : ""}
                                <span className=' float-right'>
                                    {tv ? tv.vote_average : ""} <i className='fas fa-star'></i></span>
                            </div>
                            <div className='mb-1 text-[.40rem] md:text-[.75rem]'>{tv ? tv.overview.slice(0, 118) + "...." : ""} </div>

                        </div>
                    </Link>
            }
        </div>
    )
}

export default SimilarCard
