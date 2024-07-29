import React from 'react';
import { useNavigate } from 'react-router-dom';
import imdbLogo from '/imdb.png';
import amazonLogo from '/a.png';
import googleLogo from '/google.png';
import appleLogo from '/a4.png';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();

    const handleNavigate = (platform) => {
        navigate(`/signin?platform=${platform}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="bg-white rounded shadow-lg w-full max-w-6xl flex flex-col md:flex-row">
                <div className="w-full md:w-[45%] inline-block p-8">
                    <h2 className="text-3xl font-semibold mb-6">Sign in</h2>
                    <div className="space-y-4">
                        <Link to={'/signin'} className="w-full flex items-center justify-center bg-white text-black py-2 hover:bg-gray-100 space-x-2 rounded shadow-md">
                            <img src={imdbLogo} alt="IMDb Logo" className="h-6 mr-2" />
                            <span className="font-semibold">Sign in with IMDb</span>
                        </Link>
                        <button onClick={() => handleNavigate('amazon')} className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-100 py-2 space-x-2 rounded shadow-md">
                            <img src={amazonLogo} alt="Amazon Logo" className="h-6 mr-2" />
                            <span className="font-semibold">Sign in with Amazon</span>
                        </button>
                        <button onClick={() => handleNavigate('google')} className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-100 py-2 space-x-2 rounded shadow-md">
                            <img src={googleLogo} alt="Google Logo" className="h-6 mr-2" />
                            <span className="font-semibold">Sign in with Google</span>
                        </button>
                        <button onClick={() => handleNavigate('apple')} className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-100 space-x-2 py-2 rounded shadow-md">
                            <img src={appleLogo} alt="Apple Logo" className="h-6 mr-2" />
                            <span className="font-semibold">Sign in with Apple</span>
                        </button>
                    </div>
                    <p className="text-center mt-4">
                        <a href="#" className="text-blue-600 hover:underline">Show more options</a>
                    </p>
                    <div className="flex items-center justify-center mt-6">
                        <span className="border-t w-full border-gray-300"></span>
                        <span className="px-4 text-gray-500">or</span>
                        <span className="border-t w-full border-gray-300"></span>
                    </div>
                    <Link to={'/create-account'} className="w-full mt-4 bg-yellow-500 flex justify-center py-2 rounded shadow-md hover:bg-yellow-600">
                        <span className="font-semibold text-black">Create a New Account</span>
                    </Link>
                    <p className="text-center mt-4 text-sm text-gray-500">
                        By signing in, you agree to IMDb's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </p>
                </div>
                <div className="w-full md:w-1/2 p-8 bg-white border-t md:border-t-0 md:border-l border-gray-200">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">Benefits of your free IMDb account</h2>
                    <ul className="space-y-2">
                        <li>
                            <h3 className="font-bold">Personalized Recommendations</h3>
                            <p>Discover shows you'll love.</p>
                        </li>
                        <li>
                            <h3 className="font-bold">Your Watchlist</h3>
                            <p>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                        </li>
                        <li>
                            <h3 className="font-bold">Your Ratings</h3>
                            <p>Rate and remember everything you've seen.</p>
                        </li>
                        <li>
                            <h3 className="font-bold">Contribute to IMDb</h3>
                            <p>Add data that will be seen by millions of people and get cool badges.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
