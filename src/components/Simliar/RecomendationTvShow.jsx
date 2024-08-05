import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../Card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SimilarCard from './SimilarCard';


const RecomendationTvShow = () => {
    const [tvList, setTvList] = useState([]);
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef(null);

    // Assume each card has a width of 200px and a gap of 16px
    const cardWidth = 200; // Width of each movie card
    const gap = 16; // Gap between cards
    const visibleCount = 2; // Number of movies visible at once

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, [id]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=8ba57bb67fe7f61dc132863540f5aa83&language=en-US`)
            .then(res => res.json())
            .then(data => {
                // Filter out movies without images
                const filteredTv = data.results.filter(tv => tv.poster_path);
                setTvList(filteredTv);
                setIsLoading(false);
            });
    };

    const scroll = (scrollOffset) => {
        scrollRef.current.scrollLeft += scrollOffset;
    };

    const handlePrevious = () => {
        scroll(-((cardWidth + gap) * visibleCount));
    };

    const handleNext = () => {
        scroll((cardWidth + gap) * visibleCount);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="container mx-auto px-4 mt-20 relative">
            <h2 className="text-xl md:text-xl lg:text-3xl text-white font-bold mb-8 text-center">Recommendations Tv Show</h2>
            <div className="relative flex items-center">
                <button
                    onClick={handlePrevious}
                    className="absolute left-0 z-10 px-2 py-2 bg-black bg-opacity-50 border border-white"
                >
                    <FaArrowLeft className='w-6 h-6 text-white' />
                </button>
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-4 scroll-smooth no-scrollbar"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {tvList.map(tv => (
                        <div
                            className="flex-shrink-0"
                            key={tv.id}
                            style={{ width: `${cardWidth}px` }}
                        >
                            <SimilarCard tv={tv} />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="absolute right-0 z-10 px-2 py-2 bg-black bg-opacity-50 border border-white"
                >
                    <FaArrowRight className='w-6 h-6 text-white' />
                </button>
            </div>
        </div>
    )
}

export default RecomendationTvShow
