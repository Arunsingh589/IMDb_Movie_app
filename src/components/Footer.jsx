import React from 'react';
import { BsToggle2On } from 'react-icons/bs';
import { RiExternalLinkLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <Link to={'/signuppage'} className="bg-yellow-500 font-bold text-lg text-black py-3 px-5 rounded mb-6">
                    Sign in for more access
                </Link>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col items-center border border-gray-700 p-4 rounded">
                    <h2 className="mb-4 text-xl md:text-2xl font-bold">Follow IMDb on social</h2>
                    <div className="flex space-x-12 text-2xl">
                        <a href="#" className="text-white">
                            <i className="fab fa-tiktok"></i>
                        </a>
                        <a href="#" className="text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-white">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="#" className="text-white">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                </div>
                <div className="flex items-center border border-gray-700 p-4 rounded space-x-24">
                    <div className='flex flex-col mb-8'>
                        <h2 className="mb-2 font-bold text-lg md:text-2xl">Get the IMDb app</h2>
                        <p className='text-gray-400'>For Android and iOS</p>
                    </div>
                    <div className="flex items-center">
                        <img src="/scanner.png" alt="QR Code" className="mb-2" />
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto text-center mb-6 px-4">
                <div className='flex justify-center items-center font-semibold text-sm md:text-lg gap-4 md:gap-8 flex-wrap mb-6'>
                    <a href="#" className="text-white flex items-center gap-1">Help <RiExternalLinkLine /></a>
                    <a href="#" className="text-white flex items-center gap-1">Site Index <RiExternalLinkLine /></a>
                    <a href="#" className="text-white flex items-center gap-1">IMDbPro <RiExternalLinkLine /></a>
                    <a href="#" className="text-white flex items-center gap-1">Box Office Mojo <RiExternalLinkLine /></a>
                    <a href="#" className="text-white flex items-center gap-1">License IMDb Data <RiExternalLinkLine /></a>
                </div>
                <div className='flex flex-wrap justify-center items-center text-sm md:text-lg font-semibold gap-4 md:gap-8'>
                    <a href="#" className="text-white">Press Room</a>
                    <a href="#" className="text-white flex items-center gap-1">Advertising <RiExternalLinkLine /></a>
                    <a href="#" className="text-white flex items-center gap-1">Jobs <RiExternalLinkLine /></a>
                    <a href="#" className="text-white">Conditions of Use</a>
                    <a href="#" className="text-white">Privacy Policy</a>
                    <a href="#" className="text-white flex items-center gap-1"><BsToggle2On /> Your Ads Privacy Choices</a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-white text-xl font-semibold mb-4">an amazon company</p>
                <p className="text-gray-500 font-semibold">© 1990-2024 by IMDb.com, Inc.</p>
            </div>
        </footer>
    );
};

export default Footer;
