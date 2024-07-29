import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imdbLogo from '/imdb.png';
import amazonLogo from '/a.png';
import googleLogo from '/google.png';
import appleLogo from '/a4.png';
import { Link } from 'react-router-dom';

const CreateAccountPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
    const validateEmail = (email) => /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email);
    const validatePassword = (password) => password.length >= 8;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateName(name)) {
            newErrors.name = 'Name should contain only alphabets.';
        }

        if (!validateEmail(email)) {
            newErrors.email = 'Email should be a valid @gmail.com address.';
        }

        if (!validatePassword(password)) {
            newErrors.password = 'Password should be at least 8 characters long.';
        }

        if (Object.keys(newErrors).length === 0) {
            const userData = { name, email, password };
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
            window.location.reload(); // Reload to update the displayed user name
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="bg-white rounded shadow-lg w-full max-w-6xl flex flex-col md:flex-row">
                <div className="w-full md:w-[45%] inline-block p-8">
                    <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full border rounded-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-1 p-2 block w-full border rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="mt-1 p-2 block w-full border rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-4 bg-yellow-500 flex items-center justify-center py-2 rounded shadow-md hover:bg-yellow-600"
                        >
                            <span className="font-semibold text-black">Create a New Account</span>
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        <Link to={'/signin'} className="text-blue-600 hover:underline">Already have an account? Sign in</Link>
                    </p>
                    <p className="text-center mt-4 text-sm text-gray-500">
                        By signing up, you agree to IMDb's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
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

export default CreateAccountPage;
