import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import imdbLogo from '/imdb.png'; // Update this path to your logo image
import amazonLogo from '/a.png';
import googleLogo from '/google.png';
import appleLogo from '/a4.png';

const platformLogos = {
    amazon: { logo: amazonLogo, text: 'Sign in with Amazon', newText: 'New to Amazon?', createText: 'Create your Amazon account' },
    google: { logo: googleLogo, text: 'Sign in with Google', newText: 'New to Google?', createText: 'Create your Google account' },
    apple: { logo: appleLogo, text: 'Sign in with Apple', newText: 'New to Apple?', createText: 'Create your Apple account' },
};

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [platform, setPlatform] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const platformParam = params.get('platform');
        if (platformParam && platformLogos[platformParam]) {
            setPlatform(platformParam);
        }
    }, [location.search]);

    const handleSignIn = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            navigate('/');
            window.location.reload(); // Reload to update the displayed user name
        } else {
            setError('Invalid email or password. Please create an account.');
        }
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="flex justify-center mb-6">
                    {platform ? (
                        <img src={platformLogos[platform].logo} alt={`${platform} Logo`} className="h-12" />
                    ) : (
                        <img src={imdbLogo} alt="IMDb Logo" className="h-12" />
                    )}
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email or mobile phone number</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="#" className="text-yellow-500 hover:underline text-sm mt-2 inline-block">Forgot your password?</a>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <button
                    onClick={handleSignIn}
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg shadow-md mt-6 hover:bg-yellow-600"
                >
                    Sign in
                </button>
                <div className="flex items-center justify-between mt-6">
                    <span className="flex-grow border-t border-gray-300"></span>
                    {/* <span className="px-4 text-gray-500">{platform ? platformLogos[platform].newText : 'New to IMDb?'}</span> */}
                    <span className="px-4 text-gray-500 ">New to IMDb</span>

                    <span className="flex-grow border-t border-gray-300"></span>
                </div>
                <button
                    onClick={handleCreateAccount}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow-md mt-4 hover:bg-gray-100"
                >
                    {platform ? platformLogos[platform].createText : 'Create your IMDb account'}
                </button>
                <p className="text-center text-gray-500 text-xs mt-6">
                    By signing in, you agree to IMDb's <a href="#" className="text-yellow-500 hover:underline">Conditions of Use</a> and <a href="#" className="text-yellow-500 hover:underline">Privacy Policy</a>.
                </p>
            </div>
            <footer className="mt-8 text-center text-gray-500 text-sm">
                <a href="#" className="hover:underline">Help</a> | <a href="#" className="hover:underline">Conditions of Use</a> | <a href="#" className="hover:underline">Privacy Notice</a>
                <p>&copy; 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </footer>
        </div>
    );
};

export default SignInPage;
